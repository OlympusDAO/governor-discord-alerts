# Discord notifications

Each notification uses the same Discord embed layout:

1. The linked proposal title, with its proposal ID.
2. The notification status on the first line below the title.
3. **Description**, with a brief proposal summary.
4. **Executable From**, for a queue event.
5. **Deadline**, when the notification has a voting or execution deadline.
6. **Details**, when there is an action or outcome to explain.
7. **Proposal ID**, **Proposer**, and the event **Transaction**, when applicable.

The title links to the proposal in the Olympus frontend.
The proposer address links to Etherscan.
Each event notification links to its own transaction on Etherscan.
Notifications derived from time or proposal state have no event transaction link.

## Description limit

The summary joins the first three nonempty lines after the title into one paragraph.
It excludes Markdown headings.
The summary contains at most 240 characters, including the trailing `...` when shortened.
Shortening stops at a word boundary when possible.
If the proposal has no summary, the field says `No description provided.`

## Deadlines and countdowns

The **Deadline** field shows the relative countdown first, then the absolute date on a separate line.
Discord updates the relative countdown without edits to the message.
Discord shows the absolute date in each reader's time zone.

The field uses this Discord syntax:

```text
<t:1793637780:R>
<t:1793637780:F>
```

Voting deadlines are estimates based on 12-second blocks.
The field identifies the estimate and includes the voting end block.
Execution deadlines use the proposal ETA plus the timelock grace period.
After expiry, the relative timestamp shows how long ago the deadline passed.

Successful proposals have no deadline to be queued.
Awaiting-queue notifications therefore have no **Deadline** field.
Cancellation, veto, and execution notifications also have no active **Deadline** field.

## Notification fields

All rows include the title, status, description, proposal ID, and proposer address.

| Status | Timing fields | Details | Event transaction |
| --- | --- | --- | --- |
| Proposal Created | None | None | Creation |
| Proposal Voting Started | Estimated Deadline | Voting end block appears under Deadline | Activation |
| Proposal Voting In Progress | Estimated Deadline | Quorum progress and gOHM-weighted Yes/No percentages | None |
| Proposal Voting Ended — Passed | None | Vote outcome or queue action | None |
| Proposal Voting Ended — Defeated | None | Vote outcome | None |
| Proposal Awaiting Queue | None | Queue action and no queue deadline | None |
| Proposal Queued | Executable From, Deadline | Execution action and existing notification mentions | Queue |
| Proposal Executable | Deadline | Execution action and existing notification mentions | None |
| Proposal Execution Reminder | Deadline | Execution action and existing notification mentions | None |
| Proposal Executed | None | None | Execution |
| Proposal Cancelled | None | None | Cancellation |
| Proposal Vetoed | None | None | Veto |
| Proposal Expired | Execution Deadline, if previously queued | Reason for expiry | None |

Execution and queue reminders repeat every four hours while the action remains available.
Cancellation, veto, execution, and expiry stop execution reminders.
A new emergency queue reopens monitoring.
If the real execution deadline passes before indexed state catches up, executable reminders stop.
The expiry notification waits for indexed confirmation.

## Daily voting reminders

`Proposal Voting In Progress` repeats at most once every 24 hours for each active proposal.
The first reminder follows the voting-start notification by at least 24 hours.
Existing active proposals without a reminder timestamp receive one on the next successful run.
The hourly scheduler sends each reminder on the first run after the interval passes.
The interval uses delivery time, so indexer delays cannot shorten the 24-hour gap.
Missed days produce one current reminder, without separate messages for each missed day.
Each reminder includes the linked proposal title, brief description, estimated voting deadline, and progress.
Reminders stop after voting ends, or when the proposal is canceled or vetoed.
Voting remains open through the end block, as defined by the governor.

### Vote calculations

Both calculations use gOHM voting weight, rather than a count of wallets.
The governor snapshot reads the totals and stored quorum at the same indexed Ethereum block.

- **Quorum reached:** `min(100, forVotes / quorumVotes × 100)`.
  Only Yes votes count toward quorum.
  The governor captures `quorumVotes` from gOHM supply when voting is activated.
  The reminder uses that stored requirement, without recalculating it from current supply.
- **Approval:** `forVotes / (forVotes + againstVotes) × 100`.
  The reminder shows both Yes and No percentages.
  Abstentions do not count toward approval or quorum.

Percentages use two decimal places.
Integer arithmetic preserves precision for token totals that exceed the JavaScript safe integer limit.
The Yes percentage rounds down, and No is its complement.
Quorum progress rounds down and stops at 100%.
The governor currently requires 20% of supply in Yes votes and at least 60% approval.
These rules are defined in [`GovernorBravoDelegate`](https://github.com/OlympusDAO/olympus-v3/blob/master/src/external/governance/GovernorBravoDelegate.sol).
The reminder does not hardcode either threshold.

### Fallbacks and retries

If there are no Yes or No votes, both percentages show `0.00%`, with `No Yes or No votes yet`.
If the stored quorum is zero, quorum progress shows `Unavailable` and directs readers to the proposal.
Approval still appears when its totals are available.
The reminder keeps the existing description fallback, `No description provided.`

If the RPC state read fails or indexed data is stale, the function stops before sending alerts.
It keeps the cursor for a later retry, without inventing percentages or an active voting state.
If Discord delivery fails, the daily timestamp remains unchanged for a later retry.
After a successful send, the function persists the daily timestamp using the existing GCS state.
If that write ultimately fails after delivery, a retry can duplicate the message, as with other alerts.

### Example voting reminder

These values are illustrative.

> [**#19 · CCIP Bridge Activation**](https://app.olympusdao.finance/#/governance/proposals/19)
>
> Proposal Voting In Progress
>
> **Description**
>
> Restore OHM bridging to five EVM chains.
>
> **Details**
>
> Quorum reached: **45.00%** of required Yes votes
>
> Approval: **75.00% Yes / 25.00% No**
>
> Votes are weighted by gOHM. No and abstain votes do not count toward quorum; abstentions are excluded from approval.

The example represents 900 gOHM Yes and 300 gOHM No, with a stored quorum of 2,000 gOHM.
The actual embed also includes the estimated deadline, proposal ID, and proposer.

## Examples

These examples use illustrative proposal states and times.
The examples show the native Discord timestamp syntax.
Discord renders each countdown and local date in the client.
Every example also contains the proposal ID and linked proposer address.
Event examples also contain their own linked transaction.

### Voting started

> **#19 · CCIP Bridge Activation**
>
> Proposal Voting Started
>
> **Description**
>
> This proposal re-activates OHM bridging through Chainlink CCIP. It opens the mainnet routes to five EVM chains.
>
> **Deadline**
>
> `<t:1793637780:R>`  
> `<t:1793637780:F>`  
> Estimated. Voting ends after block 26328525.
>
> **Proposal ID**  
> 19
>
> **Proposer**  
> [0x3dc70606c76125282084dc37f6f7b1e3a1ce6a5e](https://etherscan.io/address/0x3dc70606c76125282084dc37f6f7b1e3a1ce6a5e)
>
> **Transaction**  
> [View on Etherscan](https://etherscan.io/tx/0x20c8ce40f8eea1ff74df688b04dcc30de25150ebf4544528739eb47c7591875b)

### Queued

> **#19 · CCIP Bridge Activation**
>
> Proposal Queued
>
> **Description**
>
> This proposal re-activates OHM bridging through Chainlink CCIP. It opens the mainnet routes to five EVM chains.
>
> **Executable From**
>
> `<t:1793764800:R>`  
> `<t:1793764800:F>`
>
> **Deadline**
>
> `<t:1793851200:R>`\
> `<t:1793851200:F>`
>
> **Details**
>
> Execute this proposal within the execution window.

The queued example also includes the existing notification mentions in **Details**.

### Executable or execution reminder

The first executable notification uses `Proposal Executable`.
Later notifications use `Proposal Execution Reminder`.

> **#19 · CCIP Bridge Activation**
>
> Proposal Executable
>
> **Description**
>
> This proposal re-activates OHM bridging through Chainlink CCIP. It opens the mainnet routes to five EVM chains.
>
> **Deadline**
>
> `<t:1793851200:R>`  
> `<t:1793851200:F>`
>
> **Details**
>
> This proposal is available to be executed.

The executable example also includes the existing notification mentions in **Details**.

### Awaiting queue

> **#19 · CCIP Bridge Activation**
>
> Proposal Awaiting Queue
>
> **Description**
>
> This proposal re-activates OHM bridging through Chainlink CCIP. It opens the mainnet routes to five EVM chains.
>
> **Details**
>
> Voting passed. Queue this proposal to start the execution timelock. There is no queue deadline.

### Cancellation or veto

Cancellation uses `Proposal Cancelled`.
Veto uses `Proposal Vetoed`.

> **#19 · CCIP Bridge Activation**
>
> Proposal Cancelled
>
> **Description**
>
> This proposal re-activates OHM bridging through Chainlink CCIP. It opens the mainnet routes to five EVM chains.
>
> **Transaction**  
> View on Etherscan

### Expired execution window

> **#19 · CCIP Bridge Activation**
>
> Proposal Expired
>
> **Description**
>
> This proposal re-activates OHM bridging through Chainlink CCIP. It opens the mainnet routes to five EVM chains.
>
> **Deadline**
>
> `<t:1793851200:R>`  
> `<t:1793851200:F>`
>
> **Details**
>
> The execution deadline passed without being executed.

An unactivated expiry has no execution deadline.
Its **Details** field says `This proposal expired without being activated.`
