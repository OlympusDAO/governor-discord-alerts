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

The summary uses the first three nonempty lines after the title.
It excludes Markdown headings.
The summary contains at most 600 characters, including the trailing `...` when shortened.
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
