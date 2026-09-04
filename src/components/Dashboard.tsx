import { useAuth } from '../context/AuthContext'

const courses = [
  { name: 'Mathematics 201', detail: 'Prof. Abedi — Room 204', progress: 72 },
  { name: 'English Literature', detail: 'Dr. Mwanga — Room 112', progress: 58 },
  { name: 'Biology 110', detail: 'Mr. Selemani — Lab 3', progress: 85 },
  { name: 'Geography 101', detail: 'Ms. Halima — Room 308', progress: 64 },
]

const schedule = [
  { time: '08:00 – 09:30', course: 'Mathematics 201', room: 'Room 204' },
  { time: '10:00 – 11:30', course: 'English Literature', room: 'Room 112' },
  { time: '12:00 – 13:00', course: 'Lunch break', room: 'Cafeteria' },
  { time: '13:30 – 15:00', course: 'Biology 110', room: 'Lab 3' },
  { time: '15:30 – 17:00', course: 'Geography 101', room: 'Room 308' },
]

const announcements = [
  {
    date: 'Sep 4',
    title: 'Midterm exams begin Sept 16',
    body: 'The midterm examination period runs from September 16–20. Check your individual timetables in the student office.',
  },
  {
    date: 'Sep 2',
    title: 'Library extended hours',
    body: 'The main library will remain open until 9 PM weekdays through the exam period for quiet study.',
  },
  {
    date: 'Aug 30',
    title: 'New semester schedule posted',
    body: 'Your fall class schedule is now available on the portal. Report any conflicts to the registrar by Sept 8.',
  },
]

function initials(name: string): string {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function Dashboard() {
  const { user, signOut } = useAuth()

  const displayName = user?.user_metadata?.full_name ?? user?.email ?? 'Student'
  const email = user?.email ?? ''

  return (
    <div className="dash">
      <header className="dash-header">
        <div className="dash-brand">
          <div className="brand-mark">G</div>
          <div className="dash-brand-name">Greenwood Academy</div>
        </div>
        <nav className="dash-nav">
          <div className="dash-user">
            <div className="avatar">{initials(displayName)}</div>
            <div className="user-name">{displayName}</div>
          </div>
          <button type="button" onClick={() => signOut()}>Sign out</button>
        </nav>
      </header>

      <div className="dash-body">
        <div className="dash-greeting">
          <h1>Welcome back, {displayName.split(' ')[0]}.</h1>
          <p>{email} — Here's your academic overview for today.</p>
        </div>

        <div className="dash-stats">
          <div className="stat-card">
            <div className="stat-icon green">&#128218;</div>
            <div className="stat-value">4</div>
            <div className="stat-label">Enrolled courses</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon gold">&#9733;</div>
            <div className="stat-value">B+</div>
            <div className="stat-label">Avg. grade</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue">&#128197;</div>
            <div className="stat-value">5</div>
            <div className="stat-label">Classes today</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon red">&#9888;</div>
            <div className="stat-value">2</div>
            <div className="stat-label">Pending tasks</div>
          </div>
        </div>

        <div className="dash-grid">
          <div className="panel">
            <h3>Today's Schedule</h3>
            <ul className="schedule-list">
              {schedule.map((item) => (
                <li key={item.time} className="schedule-item">
                  <span className="schedule-time">{item.time}</span>
                  <div>
                    <div className="schedule-course">{item.course}</div>
                    <div className="schedule-room">{item.room}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel">
            <h3>Announcements</h3>
            {announcements.map((a) => (
              <div key={a.title} className="announcement">
                <div className="announcement-date">{a.date}</div>
                <div className="announcement-title">{a.title}</div>
                <div className="announcement-body">{a.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-section">
          <h2>My Courses</h2>
          <div className="panel">
            <ul className="course-list">
              {courses.map((c) => (
                <li key={c.name} className="course-item">
                  <div className="course-name">{c.name}</div>
                  <div className="course-detail">{c.detail}</div>
                  <div className="course-progress">
                    <div className="course-progress-bar" style={{ width: `${c.progress}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
