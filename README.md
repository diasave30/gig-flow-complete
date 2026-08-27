# Gig Flow Complete

Master Prompt — Apna Gig Worker App: Next 15 Connected Screens (W14–W28)

Project Context

Continue building the existing mobile application called Apna Gig.

The previous screens W01–W13 have already been designed, including:

Splash Screen

Onboarding

Login and OTP verification

Worker profile setup

Aadhaar/identity verification

KYC and documents

Skills and skill verification

Cooperative membership

Virtual Worker ID and QR verification

Home Dashboard

Do not redesign the existing application from scratch.

Continue using the exact same:

Color palette

Typography

Spacing

Border radius

Card styles

Button styles

Icons

Status badges

Overall mobile design language

The design must look like one single, professionally designed Apna Gig mobile application.

🚨 CRITICAL REQUIREMENT — CONNECT ALL SCREENS

Create the following 15 screens as a connected mobile application flow.

Do not create isolated screens.

Every important button, card and action must navigate to the appropriate next screen.

The user journey should be:

Home Dashboard → Availability / Service Area / Demand → Job Requests → Job Details → Accept Job → Navigate to Customer → Arrival Verification → Start OTP → Active Job → Optional Work Actions → Complete Work → End OTP

Maintain the job status and user progress throughout the entire flow.

PRIMARY NAVIGATION FLOW

The worker starts from:

W13 — Home Dashboard

From the Home Dashboard, the user can access:

Availability → W14

Service Area → W15

Demand Insights → W16

Job Requests → W17

W14 — AVAILABILITY CALENDAR

Purpose

Allow workers to manage when they are available to accept jobs.

Create a simple and intuitive mobile calendar interface.

Include:

Weekly or monthly calendar

Working day selection

Available/unavailable status

Time slots

Add availability option

Mark unavailable days

Current availability summary

Example:

Available Today
9:00 AM – 7:00 PM

Actions

Select working days

Add time slots

Edit time slots

Mark unavailable

Save Availability

Navigation

Save → W13 Home Dashboard

Back → W13 Home Dashboard

The updated availability status should be reflected on the Home Dashboard.

W15 — SERVICE AREA

Purpose

Allow the worker to define where they are willing to work.

Include:

Current location

Preferred service locations

Service radius selector

Map/location preview

Saved locations

Add new service area

Remove/edit service area

Use a clean mobile-friendly layout.

Actions

Add Service Area

Edit Radius

Save Changes

Navigation

Save → W13 Home Dashboard

Back → W13 Home Dashboard

The service area should influence the demand and job request screens conceptually.

W16 — DEMAND DASHBOARD

Purpose

Help workers understand local work opportunities and high-demand services.

Create a clean and easy-to-understand demand dashboard.

Include:

Nearby Demand

Show:

Number of nearby opportunities

Service demand around the worker

Location/area indicators

High-Demand Services

Display service categories with demand indicators.

Examples:

Home Cleaning

Plumbing

Electrical Services

Appliance Repair

Painting

Monthly and Seasonal Demand

Use simple charts or trend cards showing:

Current month demand

Increasing demand

Seasonal opportunities

Avoid complicated business analytics.

Actions

View Nearby Jobs → W17 Job Requests

Tapping a high-demand service should open W17 with that service conceptually filtered.

Back → W13 Home Dashboard

W17 — JOB REQUESTS

Purpose

Display newly available service jobs to the worker.

Create a professional list of job request cards.

Every Job Card Should Show:

Service type

General location

Distance

Requested date and time

Estimated duration

Estimated earnings in ₹

Job request status

Example:

Electrical Repair
📍 2.4 km away
🕒 Today, 3:00 PM
💰 Estimated earning: ₹850

Include:

Search

Filter

Service category filter

Distance filter

Time filter

Navigation

Tap Job Card → W18 Job Details

Back → W16 Demand Dashboard or Home Dashboard

W18 — JOB DETAILS

Create a complete job information screen.

Customer Information

Display privacy-appropriate information such as:

Customer name

Contact option where required

Location

Address

Area

Distance

Map preview

Service Details

Requested service

Job description

Customer instructions

Estimated duration

Earnings

Estimated worker earnings

Payment information

Safety Information

Include:

Safety guidelines

Important job instructions

Report concern option

Primary Actions

Accept Job

Reject Job

Navigation

Accept Job → W19 Accept / Reject Job

Reject Job → W19 Accept / Reject Job

Back → W17 Job Requests

W19 — ACCEPT / REJECT JOB

Create a decision confirmation screen.

Accept Job Flow

Show a summary of:

Service

Location

Scheduled time

Estimated earnings

Primary button:

Confirm & Accept Job

After acceptance:

W19 → W20 Navigation to Customer

Update the job status to:

Accepted

Reject Job Flow

Allow the worker to select a reason:

Too far

Timing conflict

Currently unavailable

Service mismatch

Other

After confirmation:

W19 → W17 Job Requests

Show a simple confirmation message.

Do not make rejection unnecessarily difficult.

W20 — NAVIGATION TO CUSTOMER

Create a navigation-focused mobile screen.

Include:

Large map area

Worker location

Customer location

Route preview

Distance remaining

Estimated arrival time

Navigation status

Actions

Open/Start Navigation

Contact Customer

Report Problem

I Have Arrived

The I Have Arrived button should be clearly visible.

Navigation

I Have Arrived → W21 Customer Arrival Verification

Back should not cancel the accepted job.

W21 — CUSTOMER ARRIVAL VERIFICATION

Create a secure arrival confirmation screen.

Include:

Job summary

Customer location confirmation

Arrival status

Instructions for starting the job

Show a clear progress indicator such as:

Step 1: Arrive → Step 2: Verify OTP → Step 3: Start Work

Primary Action

Confirm Arrival

Navigation

Confirm Arrival → W22 Start Work OTP

Back → W20 Navigation to Customer

W22 — START WORK OTP

Create a secure OTP verification screen.

The worker must enter the OTP provided by the customer before officially starting work.

Include:

Customer/job reference

OTP instructions

OTP input boxes

Verify button

Help option

States

Enter OTP

Verifying

OTP Verified

Invalid OTP

OTP Help Required

Navigation

Successful OTP → W23 Active Job

Back → W21 Customer Arrival Verification

Once verified, update the job status to:

Active

W23 — ACTIVE JOB

This should be one of the most important screens in the application.

Create a real-time worker job workspace.

Top Section

Display:

Active status badge

Running job timer

Start time

Job Information

Service name

Task instructions

Customer information where appropriate

Quick Actions

Provide clearly visible options for:

Contact Customer

View Job Details

Add Evidence

Report Incident

Additional Work Request

Safety Support

Primary Action

Complete Work

Navigation

Add Before-Work Evidence → W24

Report Incident → W25

Additional Work Request → W26

Complete Work → W27

Safety and emergency actions should remain easily accessible.

W24 — BEFORE-WORK EVIDENCE

Create an optional evidence capture screen.

Allow the worker to:

Take a photo

Record a video

Upload evidence

Preview evidence

Remove evidence

Clearly explain that evidence collection is optional and must respect consent and privacy requirements.

Include:

Privacy notice

Consent reminder

Evidence preview cards

Actions

Save Evidence

Skip for Now

Navigation

Save → W23 Active Job

Skip → W23 Active Job

Back → W23 Active Job

W25 — INCIDENT VIDEO RECORDING

Create a safety-focused incident reporting screen.

This screen is used when a worker experiences unsafe or abusive behaviour.

Important Design Direction

Make the interface clear and supportive without creating unnecessary panic.

Include:

Record incident video

Report incident details

Secure evidence handling information

Contact cooperative/support

Emergency/SOS shortcut

Show confirmation before submitting evidence.

Actions

Record

Stop Recording

Preview

Submit Incident

Contact Support

Navigation

Submit → Show confirmation → Return to W23 Active Job

Back → W23 Active Job

Emergency action should connect to the future Emergency/SOS module.

W26 — ADDITIONAL WORK REQUEST

Create a workflow for documenting additional work requested by the customer.

Include:

Additional work description

Estimated additional time

Estimated additional earnings

Optional photo/evidence

Customer approval status

Statuses

Draft

Pending Approval

Approved

Rejected

Actions

Send for Approval

Cancel Request

When approved, the Active Job screen should conceptually update with the additional task.

Navigation

Return → W23 Active Job

W27 — COMPLETE WORK

Create a structured job completion screen.

Include:

Work summary

Completed task checklist

Total work duration

Optional after-work photos

Completion notes

Clearly ask the worker to review the completed work before submitting.

Primary Action

Request Job Completion

Use a confirmation dialog before proceeding.

Navigation

Request Completion → W28 End Work OTP

Back → W23 Active Job

Update the job status to:

Completion Pending

W28 — END WORK OTP

Create the final job verification screen.

The job should not officially close until the completion is verified.

Include:

Job summary

Completion confirmation

Customer-provided end OTP

OTP input fields

Verify button

Help option if verification fails

Support an authorised alternative confirmation flow conceptually where required.

States

Waiting for OTP

Verifying

Verified

Verification Failed

Navigation

Successful verification should prepare the user for the next screen:

W28 → W29 Job Completed
(W29 will be built in the next module.)

Back → W27 Complete Work

COMPLETE NAVIGATION MAP

Ensure the following navigation works:

Dashboard Management Flow

W13 → W14 → W13

W13 → W15 → W13

Demand and Job Flow

W13 → W16 → W17 → W18 → W19

If Accepted:

W19 → W20 → W21 → W22 → W23

During Active Job:

W23 → W24 → W23

W23 → W25 → W23

W23 → W26 → W23

Completion:

W23 → W27 → W28 → W29 (future screen)

If Rejected:

W19 → W17

JOB STATUS MANAGEMENT

Use consistent status badges throughout the screens.

Job status should conceptually progress as:

New Request
↓
Accepted
↓
En Route
↓
Arrived
↓
Start Verification Pending
↓
Active
↓
Completion Pending
↓
Completed

Do not lose job progress when the user navigates backward or opens another job-related screen.

MOBILE UI REQUIREMENTS

All screens must be designed specifically for mobile devices.

Ensure:

Correct mobile proportions

Safe-area spacing

Proper scrolling

Large touch targets

Sticky primary action buttons when needed

Clear back navigation

Clear loading states

Error states

Success states

Confirmation dialogs for important actions

Do not design desktop dashboards.

REALISTIC DEMO DATA

Use realistic Indian context:

Indian names

Indian addresses and cities

INR currency (₹)

Kilometre distance

Realistic job timings

Realistic service categories

Use demo data only for UI presentation. Structure the application so this information can later be replaced with real backend/API data.

REUSABLE COMPONENTS

Reuse components across all screens, including:

Job cards

Status badges

Primary buttons

Secondary buttons

OTP fields

Confirmation dialogs

Evidence upload cards

Location cards

Map containers

Progress indicators

Filter chips

Maintain complete consistency with the existing Apna Gig application.

FINAL INSTRUCTION

Build these 15 connected screens from W14 to W28 as the next major module of the Apna Gig Worker App.

The experience should feel like a realistic worker journey:

Manage Availability → Define Service Area → Discover Demand → Receive Jobs → Review Job → Accept → Navigate → Arrive → Verify Customer → Start Work → Manage Active Job → Handle Evidence/Incidents/Additional Work → Complete Work → Verify End OTP.

Every screen must be connected through logical and functional navigation.

Do not create disconnected UI mockups. Create one consistent, professional, production-quality mobile application flow that continues seamlessly from the existing W01–W13 Apna Gig screens.
take the above images as the reference and make same type of screen for this and make it look profesional

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2bbeb08f-97b8-45e1-b3f1-f69e4f187b6c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
