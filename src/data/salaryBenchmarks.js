// Salary benchmarks by role and city
// Sources: Levels.fyi, Glassdoor, LinkedIn Salary (2024 data)

export const CITIES = [
  'San Francisco',
  'New York',
  'Seattle',
  'Austin',
  'Chicago',
  'Boston',
  'Los Angeles',
  'Denver',
  'Remote',
]

export const INDUSTRIES = [
  'Tech',
  'Finance',
  'Healthcare',
  'E-commerce',
  'Startup',
  'Enterprise',
]

const BENCHMARKS = {
  'Junior Engineer': {
    base: 90000,
    byCity: { 'San Francisco': 118000, 'New York': 108000, 'Seattle': 108000, 'Austin': 88000, 'Chicago': 85000, 'Boston': 100000, 'Los Angeles': 100000, 'Denver': 88000, 'Remote': 92000 },
    byIndustry: { Tech: 95000, Finance: 98000, Healthcare: 82000, 'E-commerce': 90000, Startup: 88000, Enterprise: 92000 },
  },
  'Engineer': {
    base: 120000,
    byCity: { 'San Francisco': 158000, 'New York': 148000, 'Seattle': 148000, 'Austin': 118000, 'Chicago': 112000, 'Boston': 135000, 'Los Angeles': 135000, 'Denver': 118000, 'Remote': 122000 },
    byIndustry: { Tech: 128000, Finance: 135000, Healthcare: 108000, 'E-commerce': 120000, Startup: 115000, Enterprise: 122000 },
  },
  'Senior Engineer': {
    base: 150000,
    byCity: { 'San Francisco': 198000, 'New York': 188000, 'Seattle': 185000, 'Austin': 148000, 'Chicago': 140000, 'Boston': 168000, 'Los Angeles': 168000, 'Denver': 148000, 'Remote': 155000 },
    byIndustry: { Tech: 162000, Finance: 172000, Healthcare: 135000, 'E-commerce': 152000, Startup: 148000, Enterprise: 155000 },
  },
  'Staff Engineer': {
    base: 185000,
    byCity: { 'San Francisco': 248000, 'New York': 235000, 'Seattle': 232000, 'Austin': 182000, 'Chicago': 172000, 'Boston': 210000, 'Los Angeles': 210000, 'Denver': 182000, 'Remote': 190000 },
    byIndustry: { Tech: 198000, Finance: 212000, Healthcare: 168000, 'E-commerce': 188000, Startup: 182000, Enterprise: 190000 },
  },
  'Product Manager': {
    base: 110000,
    byCity: { 'San Francisco': 148000, 'New York': 140000, 'Seattle': 138000, 'Austin': 108000, 'Chicago': 102000, 'Boston': 125000, 'Los Angeles': 125000, 'Denver': 108000, 'Remote': 115000 },
    byIndustry: { Tech: 118000, Finance: 122000, Healthcare: 100000, 'E-commerce': 112000, Startup: 108000, Enterprise: 114000 },
  },
  'Senior PM': {
    base: 145000,
    byCity: { 'San Francisco': 192000, 'New York': 182000, 'Seattle': 178000, 'Austin': 140000, 'Chicago': 132000, 'Boston': 162000, 'Los Angeles': 162000, 'Denver': 140000, 'Remote': 148000 },
    byIndustry: { Tech: 155000, Finance: 162000, Healthcare: 130000, 'E-commerce': 148000, Startup: 142000, Enterprise: 148000 },
  },
  'Designer': {
    base: 100000,
    byCity: { 'San Francisco': 132000, 'New York': 125000, 'Seattle': 122000, 'Austin': 98000, 'Chicago': 92000, 'Boston': 112000, 'Los Angeles': 115000, 'Denver': 98000, 'Remote': 102000 },
    byIndustry: { Tech: 108000, Finance: 105000, Healthcare: 90000, 'E-commerce': 102000, Startup: 98000, Enterprise: 102000 },
  },
  'Manager': {
    base: 140000,
    byCity: { 'San Francisco': 182000, 'New York': 172000, 'Seattle': 170000, 'Austin': 135000, 'Chicago': 128000, 'Boston': 155000, 'Los Angeles': 155000, 'Denver': 135000, 'Remote': 142000 },
    byIndustry: { Tech: 150000, Finance: 158000, Healthcare: 125000, 'E-commerce': 142000, Startup: 138000, Enterprise: 144000 },
  },
  'Director': {
    base: 180000,
    byCity: { 'San Francisco': 238000, 'New York': 228000, 'Seattle': 222000, 'Austin': 172000, 'Chicago': 162000, 'Boston': 202000, 'Los Angeles': 202000, 'Denver': 172000, 'Remote': 185000 },
    byIndustry: { Tech: 195000, Finance: 208000, Healthcare: 162000, 'E-commerce': 182000, Startup: 175000, Enterprise: 185000 },
  },
  'VP / Executive': {
    base: 250000,
    byCity: { 'San Francisco': 328000, 'New York': 318000, 'Seattle': 308000, 'Austin': 242000, 'Chicago': 228000, 'Boston': 278000, 'Los Angeles': 278000, 'Denver': 242000, 'Remote': 258000 },
    byIndustry: { Tech: 268000, Finance: 285000, Healthcare: 228000, 'E-commerce': 252000, Startup: 242000, Enterprise: 258000 },
  },
  'Data Scientist': {
    base: 130000,
    byCity: { 'San Francisco': 172000, 'New York': 162000, 'Seattle': 160000, 'Austin': 125000, 'Chicago': 118000, 'Boston': 145000, 'Los Angeles': 145000, 'Denver': 125000, 'Remote': 133000 },
    byIndustry: { Tech: 140000, Finance: 148000, Healthcare: 118000, 'E-commerce': 132000, Startup: 128000, Enterprise: 133000 },
  },
  'DevOps Engineer': {
    base: 125000,
    byCity: { 'San Francisco': 165000, 'New York': 155000, 'Seattle': 152000, 'Austin': 120000, 'Chicago': 114000, 'Boston': 140000, 'Los Angeles': 140000, 'Denver': 120000, 'Remote': 128000 },
    byIndustry: { Tech: 133000, Finance: 140000, Healthcare: 112000, 'E-commerce': 126000, Startup: 122000, Enterprise: 128000 },
  },
  'Marketing Manager': {
    base: 95000,
    byCity: { 'San Francisco': 125000, 'New York': 118000, 'Seattle': 115000, 'Austin': 90000, 'Chicago': 85000, 'Boston': 105000, 'Los Angeles': 108000, 'Denver': 90000, 'Remote': 97000 },
    byIndustry: { Tech: 102000, Finance: 100000, Healthcare: 85000, 'E-commerce': 98000, Startup: 92000, Enterprise: 97000 },
  },
  'Sales Manager': {
    base: 105000,
    byCity: { 'San Francisco': 138000, 'New York': 130000, 'Seattle': 128000, 'Austin': 100000, 'Chicago': 95000, 'Boston': 118000, 'Los Angeles': 118000, 'Denver': 100000, 'Remote': 108000 },
    byIndustry: { Tech: 112000, Finance: 118000, Healthcare: 95000, 'E-commerce': 108000, Startup: 102000, Enterprise: 108000 },
  },
}

export function getSuggestedSalary(role, city = 'Remote', industry = 'Tech') {
  const data = BENCHMARKS[role]
  if (!data) return null

  // City takes priority if available
  const citySalary = data.byCity[city]
  const industrySalary = data.byIndustry[industry]

  if (citySalary && industrySalary) {
    // Blend: weight city 60%, industry 40%
    return Math.round((citySalary * 0.6 + industrySalary * 0.4) / 1000) * 1000
  }
  return citySalary || industrySalary || data.base
}

export function getRoleNames() {
  return Object.keys(BENCHMARKS)
}

export { BENCHMARKS }
