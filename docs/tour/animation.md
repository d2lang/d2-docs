import AnimationExample from '@site/src/components/AnimationExample';
import CodeBlock from '@theme/CodeBlock';
import CacheStampede from '@site/static/bespoke-d2/cache-stampede.d2';
import Recovery from '@site/static/bespoke-d2/animation-recovery.d2';
import Battery from '@site/static/bespoke-d2/animation-battery.d2';

# Animation

Draw a diagram, add a [board](./composition.md) showing what happens next, and
set `animate-interval`. D2 plays the boards in order as a looping SVG or GIF.
You can mix layers, scenarios, and steps in the same animation. To show a
value changing *during* a step, like a battery draining, set `animate-duration`.

## How 1,200 GETs become one origin read

Six edge caches each receive 200 requests for the same image. Watch Ashburn,
the third row. Its amber request reaches the shield while the others are
still on their way.

<img
  src="/img/generated/cache-stampede.svg"
  alt="Six edge caches send GETs to a shared shield. One GET reaches the origin. The response returns to the shield, then to the edges and their viewers."
  width="1008"
  height="578"
  style={{height: 'auto'}}
/>

<a href="/img/generated/cache-stampede.svg">Open the animation</a>
{' · '}
<a href="/bespoke-d2/cache-stampede.d2" download="cache-stampede.d2">Download the D2 source</a>

The shield starts one origin GET for Ashburn. The other five edges wait for
that same fetch. When the mint response comes back, each edge gets a copy
and serves its 200 viewers. The origin sends 256 KiB and the viewers receive
300 MiB.

<details>
<summary>How do the requests move?</summary>

Look for `origin-get` in the source below. Its connection stroke is a linear
gradient with a narrow amber band. One step moves both ends of that band
together. The next hop's band starts outside its connection, so it comes into
view just as the request arrives. This works on curves that keep moving in
the same direction along the gradient axis.

Each dash on a viewer connection stands for 50 messages. Farther upstream,
one dash is one GET or one response. The opening board lasts 140 ms and one
7.2-second step runs the whole exchange.

<CodeBlock className="language-d2" hidePlaygroundLink>{CacheStampede}</CodeBlock>

</details>

Render the downloaded source with the D2 CLI.

```sh
d2 cache-stampede.d2 cache-stampede.svg
```

Use `cache-stampede.gif` as the output filename to get a GIF.

:::note
`animate-duration` is available on D2's `master` branch for the next release.
:::

## Play layers, scenarios, and steps

A bad release takes all three checkout replicas out of rotation. Show the
incident with a scenario, then add a step for the rollback as the replicas
start passing their health checks again.

<CodeBlock className="language-d2" hidePlaygroundLink>{Recovery}</CodeBlock>

<img src="/img/generated/animation-recovery.svg" alt="The checkout load balancer sees healthy replicas drop from three to zero at once, then recover one by one during rollback." width="231" height="266" style={{height: 'auto'}} loading="lazy" />

Set both timing options once in `vars.d2-config`. With `animate-interval: 1s`,
the load balancer shows three healthy replicas for one second. The incident
scenario cuts straight to zero for another second. In the rollback step,
`animate-duration: 400ms` brings the count back to three over 400 ms. It
stays there for the remaining 600 ms.

Layers and scenarios switch as whole boards. A step animates from its parent
board if it's the first step, or from the previous step otherwise. This also
works for steps inside a layer or scenario.

## Animate a value between steps

A pallet tracker reports its battery charge over MQTT. On the fleet dashboard,
the number and the green bar both come from one [variable](./vars.md),
`${charge}`. Change it once to show a tracker running down to 15% before
its next shipment.

<CodeBlock className="language-d2" hidePlaygroundLink>{Battery}</CodeBlock>

<img src="/img/generated/animation-battery.svg" alt="A pallet tracker reports its charge to a dashboard. The green bar shrinks as the readout falls from 65% to 15%." width="248" height="269" style={{height: 'auto'}} loading="lazy" />

The opening board lasts 800 ms. The step takes the full four seconds to
drain the battery, even though the interval is shorter. Try setting
`animate-duration` to `300ms`. The readout now reaches 15% in 300 ms and
stays there for 500 ms.

D2 can fill in values between two numbers, percentages, colors, or compatible
gradients. If a step introduces a variable or changes ordinary text, its new
value appears immediately. For a [state label](#fill) that announces the
result of a transition, put the new words in the following step. For a
[counter](#count-in-a-label), put the numeric variable in the label so the
reader can watch the value change. Static exports show the final value of each step.

The default duration is zero. You can override it on the CLI with
`--animate-duration=300` (milliseconds).

## Animate styles

Give a property a starting value, then change it in a step. The starting
value can also come from a [class](./classes.md). Each example below shows
one property at work.

### Opacity

During a rolling deployment, the gateway sends new requests to API v2
while v1 finishes the requests it already has. In the `drained` step,
lower `style.opacity` from `1` to `0.2` on both v1 and its route. You
can still see where the old requests went. The v2 route stays fully visible.

<AnimationExample name="opacity" width={258} height={271} alt="The gateway's in-flight route and API v1 fade together after draining. The route for new requests to API v2 stays visible." open />

### Fill

A container registry checks the signature of image v42 before releasing it
from quarantine. Change the fill from amber to green in one step. In the
next step, change “Signature check” to “Signature verified”. The reader
gets to see the check finish before reading the result.

<AnimationExample name="fill" width={242} height={195} alt="Image v42 turns green during its signature check. Once the fill has settled, its label changes to Signature verified." />

D2 blends opaque named colors and three- or six-digit hex colors. A solid
fill changes to `transparent` immediately. For gradual transparency, see
[how to fade one end of a fill](#fade-one-end-of-a-fill).

You can also set `style.fill` on the whole board. The catalog turns amber
to announce a maintenance window. When the write freeze begins in the
following step, the API switches to read only and the import job pauses.

<AnimationExample name="background" width={268} height={78} alt="The catalog background turns amber. On the following board the API becomes read only and the import job pauses." />

### Stroke

A payment router normally sends charges to acquirer A. The teal stroke
shows which route handles payments. Follow it to B during failover and
back to A when A recovers. The route labels, “preferred” and “fallback”,
stay in place throughout.

Change `(router -> b)[0].style.stroke` to recolor the first connection
from the router to B.

<AnimationExample name="stroke" width={318} height={271} alt="The teal highlight moves from the preferred payment route to the fallback route and back. Both route labels stay fixed." />

### Font color

One webhook endpoint receives both `order.created` and `order.paid`. When
the paid event exhausts its retries, turn its name red with
`style.font-color`. Keeping both event names in place makes it easy to
pick out the delivery that needs attention.

<AnimationExample name="font-color" width={312} height={122} alt="Under the orders webhook endpoint, order.paid turns red while order.created stays the same." />

### Stroke width

Show a read router shifting traffic between replicas. As reads move west,
thicken the west connection from `2` to `8` and narrow the east connection
by the same amount. Both routes stay open. The thicker stroke tells you
which replica is carrying more traffic.

<AnimationExample name="stroke-width" width={336} height={250} alt="The east and west replicas both stay connected. The west route thickens as the east route thins." />

### Stroke dash

The orders database already replicates locally. Draw the planned EU route
with `style.stroke-dash: 6`. When replication starts, change it to `0` so
both active routes are solid. To show data continually moving along a route,
see [flow along a connection](#flow-along-a-connection).

<AnimationExample name="stroke-dash" width={362} height={250} alt="The new EU replication route starts dashed and turns solid like the existing local replication route." />

### Border radius

A recorder's capture control is a red circle when it's ready to record
and a rounded square when tapping it will stop the recording. Keep the
control's dimensions at `48` and change `style.border-radius` from `24`
to `4` when capture starts.

<AnimationExample name="border-radius" width={156} height={278} alt="The audio recorder's circular capture control becomes a rounded square when recording starts. Its caption stays in place." />

### Font size

Checkout has a 250 ms latency budget. As its p95 rises from 120 ms to
680 ms, enlarge the observed reading with `style.font-size`. Keeping the
budget at its original size makes it easy to see which number changed.

<AnimationExample name="font-size" width={288} height={163} alt="Checkout's p95 reading grows larger as it climbs from 120 to 680 ms. Its 250 ms budget stays fixed." />

### Width

How much of the 200 ms budget for `GET /cart` goes to SQL? On a cold read,
the query grows from 100 ms to 200 ms. Double the SQL span's `width` in
the same step. When it matches the dashed budget above it, the database
alone is using the entire request budget.

<AnimationExample name="width" width={238} height={158} alt="The SQL span grows from half the width of the dashed 200 ms request budget to its full width." />

### Height

A campaign enqueues 20 emails per second and the mailer sends only 10.
After 20 seconds the backlog has grown from 200 to 400. Double the
queue's `height` as the count rises. The rates on either side show why
it keeps growing.

<AnimationExample name="height" width={144} height={480} alt="The mail queue grows taller as its backlog doubles. The incoming rate remains 20 jobs per second and the outgoing rate remains 10." />

If you set both dimensions on a square or circle, change them together
so they stay equal.

## Change a gradient

You can change a whole gradient in a step, or use a variable to control
one part of it.

### Fill a progress bar

An indexer is rebuilding an eight-partition search index from a product catalog.
Two partitions are done at the first checkpoint and six at the next.
Set the green and off-white stops to the same percentage to give the
index a sharp progress boundary. Moving both stops from 25% to 75% carries
that boundary across the index.

<AnimationExample name="linear-gradient" width={359} height={103} alt="A catalog backfills an eight-partition search index. Its green fill advances from one quarter complete to three quarters." />

When you change a whole gradient, D2 pairs up the stops in order and
blends their positions and colors. Keep the same gradient kind, number of
stops, and, for a linear gradient, direction. Otherwise the new gradient
appears immediately.

### Fade one end of a fill

A mapping service stitches overlapping aerial photos into a mosaic. Where
a new flight strip overlaps the base imagery, a hard edge would leave a
visible seam. Change the left stop of the strip's fill to `transparent`.
The green base shows through at the edge and gradually gives way to the
blue strip across the first 35%. The rest of the strip stays opaque.

<AnimationExample name="gradient-opacity" width={272} height={179} alt="The left edge of a new blue flight strip fades into the green base imagery while the rest of the overlay stays opaque." />

### Expand a radial gradient

A ride dispatcher finds no available driver near the pickup, so it widens
the search. The pickup and both cabs stay in place. The blue area expands
until it reaches the cabs. The `area` variable holds the whole radial
gradient, so changing its two stops moves the search boundary outward.

<AnimationExample name="radial-gradient" width={228} height={268} alt="The search area expands around a stationary pickup until cab A and cab B fall inside it." />

### Rotate a gradient

In a live video mixer, a wipe can put the camera and the speaker's slides
on screen at the same time. At 0° the slides run along the bottom of the
picture. At 90° they sit on the right. Give the two colors the same stop
to keep that edge sharp, then change `${angle}` to turn it. The output
label shows the angle as you go.

<AnimationExample name="gradient-angle" width={266} height={260} alt="Blue represents the camera and gold represents slides. Their dividing line turns a quarter turn across the mixer output as the angle goes from zero to 90 degrees." />

### Send a pulse along a connection

Does a cache hit reach the database? The order API looks up `order:481`.
Redis already has it, so only the Redis connection carries a request.
The arrowhead stays gray until the orange band reaches it. The Postgres
path stays still. This is the same technique used for the
[shield cache](#how-1200-gets-become-one-origin-read).

<AnimationExample name="request-pulse" width={395} height={226} alt="An orange pulse travels from the order API to Redis, where order 481 is cached. The Postgres connection marked “on miss” stays still." />

Put a narrow orange band in the connection's stroke gradient. Its back
and front, `tail` and `head`, stay 20 percentage points apart as the step
moves them from left to right. Starting the tail below 0% and ending the
head above 100% lets the pulse enter and leave the line.

## Animate with variables

The [tracker's battery gauge](#animate-a-value-between-steps) uses one
percentage for both its label and its fill. You can also put a variable in
a label, share it between services, or use it to position a shape.

### Count in a label

Billing is 120 orders behind. As its consumer replays the orders topic,
the number of records left to process counts down to zero. Put `${lag}`
in the label and change it in the catch-up step. Integer endpoints give
you whole records. For a metric measured in tenths, such as seconds of lag,
use decimal endpoints like `12.0` and `0.0`.

<AnimationExample name="counter" width={204} height={282} alt="The billing consumer catches up to the orders topic as its lag falls from 120 records to zero." />

### Share a color

Two endpoints serve the same wildcard certificate. When it expires, both
hosts fail TLS checks. Bind their fills to `${tls}` so renewing the one
certificate turns both hosts green together. The wildcard name above them
shows what they have in common.

<AnimationExample name="shared-color" width={359} height={266} alt="The API and payment hosts share one wildcard certificate. Both hosts change from red to green when it is renewed." />

### Move a pinned shape

Which part of the write-ahead log has a replica replayed? Pin two WAL
segments side by side with [TALA](./positions.md#top-and-left) and put a
cursor under segment 7. The step changes `x` from `22` to `174`, sliding
the cursor into segment 8. Bind `left` to the variable. Assigning a new
`left` directly in the step moves the cursor in one jump.

<AnimationExample name="position" width={310} height={113} alt="A replica's replay cursor slides from write-ahead log segment 7 into segment 8 while both segments stay fixed." />

Both ends of a variable change must be the same kind of value. For example,
`20%` can animate to `80%`. Changing `20` to `80%`, introducing a new
variable, or replacing text like `idle` with `busy` takes effect immediately.

## Grid animations

To animate a [grid](./grid-diagrams.md), draw its next arrangement in a
[step](./steps.md) and set a positive `animate-duration` in `vars.d2-config`.
D2 matches cells by their full IDs across the two boards. Keep an ID when the
same job changes position. Give its replacement a new ID when a different job
takes its place.

### Hand a partition to another worker

A Kafka consumer goes offline. Follow the refunds partition as `worker-37`
takes over from `worker-23`. The worker's outline stays in place and the
two arrows still connect the partition to the refund ledger. The ledger then
opens to show why the new worker resumes at offset **18,241**. Its predecessor
saved **18,240** with the last ledger update.

<AnimationExample name="grid-consumers" width={754} height={284} alt="The refunds worker changes from worker-23 to worker-37. Its ledger opens to show the applied and resume offsets. The payments path stays fixed." />

To get this handoff, replace one rectangular cell with another of the same
size and style in the same slot. Give both a plain, centered, single-line
label and keep the other cells in the grid in place. For equal-length
monospace identifiers like these, the shared `worker-` stays still while
the digits roll. Each column in this example is its own grid, so expanding
the ledger leaves the input partitions and workers where they were.

### Reorder a recovery queue

The blob index finishes restoring, and the ledger gets priority over the
audit log. Watch the ledger move from third to first while two new restores
join the queue.

<AnimationExample name="grid-restore" width={477} height={150} alt="The completed blob-index restore shrinks away. The ledger slides to the head of the queue, and search and thumbnail restores grow into the last two slots." />

A [grid fills in declaration order](./grid-diagrams.md#dominant-direction).
In the `reprioritize` step, `blob: null` removes the completed job. The
step clears and redeclares the waiting jobs after `ledger`, keeping their
IDs. Those jobs slide to their new slots. Only the two new IDs grow into
view.

### Add or retire a row or column

A native Node module builds on Linux, macOS, and Windows. Adding Node 24
creates a job on each runner. Watch the Node 26 column slide over to make
room for all three jobs and their header. In the next step, the project
retires Node 22. Its jobs shrink together before the gap closes.

<AnimationExample name="grid-ci" width={569} height={220} alt="A CI matrix opens a column between Node 22 and 26 for Node 24. The Node 22 column then disappears, and the remaining jobs move left." />

Insert or remove one complete row or column in a filled grid, keeping the
other cells in the same relative order. If you append cells at the end and
the existing cells already have room, the new cells can appear immediately.

### Open a cell to inspect its contents

Which disk in the data mirror needs replacing? Keep the ID `mirrorB` and
give that cell a two-column grid in the `inspect` step. The rectangle grows,
then the disk labels appear together when they fit. Watch `nvme-05` change
to `nvme-07` while the healthy disk stays in place.

<AnimationExample name="grid-mirror" width={420} height={255} alt="The data mirror opens to reveal two disks. One disk is replaced, then the details fade and the mirror closes between its neighbors." />

To fold it closed, remove the child cells and restore the summary cell's
dimensions. The labels fade before the space closes up.

## Animate a single board

Set `style.animated: true` for motion that repeats on its own. These two
SVGs each have a single board and use the default timing options.

### Float a shape

Release v2.8 is queued for production. The reviewer has one thing to do
before it can ship. Set `approval.style.animated: true` on the approval
gate so it lifts above its shadow while the queued deployment stays still.

<AnimationExample name="floating-shape" width={210} height={282} alt="The production approval gate rises and settles above a queued release that is waiting for a reviewer." open />

### Flow along a connection

Fraud checks consume order changes as they happen. The BI warehouse gets
a snapshot each night. Set `style.animated: true` on just the change feed
so a reader can tell which downstream system sees a new order right away.

<AnimationExample name="flowing-connection" width={355} height={323} alt="Moving dashes carry the continuous change feed from the orders database to fraud checks. The nightly warehouse snapshot has a stationary arrow." open />
