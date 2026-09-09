import React, { useEffect, useState } from "react";
import { fetchDonations } from "./donations.mjs";
import styles from "./styles.module.css";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const amountFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const fundUrl = "https://hcb.hackclub.com/d2/donations";

export default function DonorList() {
  const [donations, setDonations] = useState(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => controller.abort(), 20000);
    setError(false);

    fetchDonations(controller.signal)
      .then((records) => {
        if (active) setDonations(records);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt]);

  if (error) {
    return (
      <div className={styles.notice} role="status">
        <p>
          We couldn’t load the donor list. You can still view all donations on{" "}
          <a href={fundUrl}>HCB</a>.
        </p>
        <button
          className="button button--secondary button--outline"
          onClick={() => setAttempt((value) => value + 1)}
        >
          <span>Try again</span>
        </button>
      </div>
    );
  }

  if (donations === null) {
    return (
      <p className={styles.notice} role="status">
        Loading donations…
      </p>
    );
  }

  if (donations.length === 0) {
    return (
      <p className={styles.notice}>
        Our donor list will appear here as donations arrive.
      </p>
    );
  }

  const years = [
    ...new Set(donations.map((d) => new Date(d.date).getUTCFullYear())),
  ];

  return (
    <div className={styles.list}>
      {years.map((year) => (
        <section key={year} aria-labelledby={`donations-${year}`}>
          <h2 id={`donations-${year}`}>{year}</h2>
          <div className={styles.tableContainer}>
            <table
              className={styles.table}
              aria-labelledby={`donations-${year}`}
            >
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Donor</th>
                  <th scope="col" className={styles.amount}>
                    Amount (USD)
                  </th>
                  <th scope="col">Type</th>
                </tr>
              </thead>
              <tbody>
                {donations
                  .filter((d) => new Date(d.date).getUTCFullYear() === year)
                  .map((donation) => (
                    <tr key={donation.id}>
                      <td className={styles.date}>
                        <time dateTime={donation.date}>
                          {dateFormat.format(new Date(donation.date))}
                        </time>
                      </td>
                      <td className={styles.name}>{donation.name}</td>
                      <td className={styles.amount}>
                        {amountFormat.format(donation.amount / 100)}
                      </td>
                      <td className={styles.type}>
                        {donation.recurring ? "Monthly" : "One-time"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
      <p className={styles.source}>
        Updated automatically from <a href={fundUrl}>D2’s public HCB fund</a>.
      </p>
    </div>
  );
}
