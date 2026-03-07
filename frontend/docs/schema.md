

| Column       | Type        | Required | Notes              |
|--------------|-------------|----------|--------------------|
| id           | UUID        | Yes      | PK, gen_random_uuid|
| email        | VARCHAR     | Yes      | UNIQUE             |
| role         | VARCHAR     | Yes      | seeker/guide/admin |
| full_name    | VARCHAR     | Yes      |                    |
| phone        | VARCHAR     | No       |                    |
| is_verified  | BOOLEAN     | Yes      | default false      |
| created_at   | TIMESTAMPTZ | Yes      | default now()      |