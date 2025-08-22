```md
# Guest Visit Scheduling – Backend

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Setup
```bash
git clone <repo-url> guest-visit-scheduler
cd guest-visit-scheduler
npm i
cp .env.example .env
# edit .env with your MongoDB connection string
npm run dev
```

Server starts on `http://localhost:4000`. Health check: `GET /health`.

### Endpoints

#### Create a visit
`POST /api/visits`
```json
{
  "guestName": "Ishan Jain",
  "visitDate": "2025-08-25",
  "visitTime": "15:30",
  "countryCode": "+91",
  "phoneNumber": "7728919575",
  "email": "ishan@example.com",
  "address": "Poornima College Road, Jaipur",
  "aadhaar": "123412341234",
  "notes": "Bring visitor badge"
}
```

#### List visits (filters & pagination)
`GET /api/visits?status=scheduled&from=2025-08-20&to=2025-08-31&page=1&limit=10`

#### Get by id
`GET /api/visits/:id`

#### Update
`PUT /api/visits/:id`
```json
{ "status": "completed" }
```