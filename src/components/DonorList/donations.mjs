export const DONATIONS_URL =
  "https://hcb.hackclub.com/api/v3/organizations/d2/donations";

export async function fetchDonations(signal, request = fetch) {
  const donations = new Map();
  const perPage = 50;
  let page = 1;

  while (true) {
    const response = await request(
      `${DONATIONS_URL}?page=${page}&per_page=${perPage}`,
      { signal, credentials: "omit" },
    );
    if (!response.ok) throw new Error("Could not load donations");
    const records = await response.json();
    if (!Array.isArray(records))
      throw new Error("Unexpected donation response");

    for (const donation of records) {
      if (!["deposited", "in_transit"].includes(donation.status)) continue;
      if (
        typeof donation.id !== "string" ||
        !Number.isSafeInteger(donation.amount_cents) ||
        donation.amount_cents <= 0 ||
        typeof donation.date !== "string" ||
        !Number.isFinite(Date.parse(donation.date))
      ) {
        throw new Error("Unexpected donation record");
      }
      donations.set(donation.id, {
        id: donation.id,
        name:
          donation.donor?.anonymous === false && donation.donor?.name?.trim()
            ? donation.donor.name.trim()
            : "Anonymous",
        date: donation.date,
        amount: donation.amount_cents,
        recurring: donation.recurring === true,
        processing: donation.status === "in_transit",
      });
    }

    // HCB exposes pagination headers to browsers. Fall back to page size if
    // those headers are unavailable, so the list never silently stops at 50.
    const next = response.headers.get("X-Next-Page");
    if (next !== null) {
      if (!next.trim()) break;
      const nextPage = Number(next);
      if (!Number.isInteger(nextPage) || nextPage <= page) {
        throw new Error("Unexpected pagination response");
      }
      page = nextPage;
    } else {
      if (records.length < perPage) break;
      page += 1;
    }
  }

  return [...donations.values()].sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date),
  );
}
