import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { 
  getExperiences, addExperience, updateExperience, deleteExperience,
  getProjects, addProject, updateProject, deleteProject,
  getEducation, addEducation, updateEducation, deleteEducation,
  getSkills, addSkill, updateSkill, deleteSkill,
  getProfile, updateProfile
} from '../../lib/api'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaEdit, FaTrash, FaPlus, FaSave, FaTimes, 
  FaGooglePlay, FaApple, FaGraduationCap, FaTools, FaUser
} from 'react-icons/fa'
import './Dashboard.css'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('experiences')
  const [loading, setLoading] = useState(true)
  
  // Data states
  const [experiences, setExperiences] = useState([])
  const [projects, setProjects] = useState([])
  const [education, setEducation] = useState([])
  const [skills, setSkills] = useState([])
  const [profile, setProfile] = useState(null)
  
  // Form states
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    loadData()
  }, [activeTab])

  const loadData = async () => {
    setLoading(true)
    try {
      switch(activeTab) {
        case 'experiences':
          const expData = await getExperiences()
          setExperiences(expData || [])
          break
        case 'projects':
          const projData = await getProjects()
          setProjects(projData || [])
          break
        case 'education':
          const eduData = await getEducation()
          setEducation(eduData || [])
          break
        case 'skills':
          const skillsData = await getSkills()
          setSkills(skillsData || [])
          break
        case 'profile':
          const profileData = await getProfile()
          setProfile(profileData)
          break
        default:
          break
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  const getFormData = () => {
    switch(activeTab) {
      case 'experiences':
        return {
          company: '',
          role: '',
          period: '',
          location: '',
          description: '',
          color: '#6366F1'
        }
      case 'projects':
        return {
          name: '',
          description: '',
          platforms: ['Android', 'iOS'],
          color: '#6366F1',
          android_url: '',
          ios_url: ''
        }
      case 'education':
        return {
          degree: '',
          school: '',
          period: '',
          gpa: '',
          details: []
        }
      case 'skills':
        return {
          name: '',
          level: 80,
          color: '#6366F1'
        }
      case 'profile':
        return profile || {
          name: '',
          title: '',
          email: '',
          phone: '',
          location: '',
          linkedin: '',
          summary: ''
        }
      default:
        return {}
    }
  }

  const handleAdd = () => {
    setFormData(getFormData())
    setEditingId(null)
    setShowForm(true)
  }

  const handleEdit = (item) => {
    if (activeTab === 'education') {
      setFormData({
        ...item,
        details: item.details || []
      })
    } else if (activeTab === 'projects') {
      setFormData({
        ...item,
        platforms: item.platforms || ['Android', 'iOS']
      })
    } else {
      setFormData(item)
    }
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this?')) return
    try {
      switch(activeTab) {
        case 'experiences': await deleteExperience(id); break
        case 'projects': await deleteProject(id); break
        case 'education': await deleteEducation(id); break
        case 'skills': await deleteSkill(id); break
        default: break
      }
      loadData()
    } catch (error) {
      console.error('Error deleting:', error)
      alert('Failed to delete')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let data = { ...formData }
      
      // Handle education details as array
      if (activeTab === 'education' && typeof data.details === 'string') {
        data.details = data.details.split('\n').filter(d => d.trim())
      }
      
      if (editingId) {
        switch(activeTab) {
          case 'experiences': await updateExperience(editingId, data); break
          case 'projects': await updateProject(editingId, data); break
          case 'education': await updateEducation(editingId, data); break
          case 'skills': await updateSkill(editingId, data); break
          case 'profile': await updateProfile(data); break
          default: break
        }
      } else {
        switch(activeTab) {
          case 'experiences': await addExperience(data); break
          case 'projects': await addProject(data); break
          case 'education': await addEducation(data); break
          case 'skills': await addSkill(data); break
          default: break
        }
      }
      loadData()
      setShowForm(false)
      setEditingId(null)
    } catch (error) {
      console.error('Error saving:', error)
      alert('Failed to save: ' + error.message)
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingId(null)
  }

  const togglePlatform = (platform) => {
    const platforms = formData.platforms || []
    if (platforms.includes(platform)) {
      setFormData({ ...formData, platforms: platforms.filter(p => p !== platform) })
    } else {
      setFormData({ ...formData, platforms: [...platforms, platform] })
    }
  }

  const renderForm = () => {
    switch(activeTab) {
      case 'experiences':
        return (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Company *</label>
                <input
                  type="text"
                  value={formData.company || ''}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Role *</label>
                <input
                  type="text"
                  value={formData.role || ''}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Period *</label>
                <input
                  type="text"
                  value={formData.period || ''}
                  onChange={(e) => setFormData({...formData, period: e.target.value})}
                  placeholder="e.g., Jan 2024 - Present"
                  required
                />
              </div>
              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Description *</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="4"
                placeholder="Enter key responsibilities (one per line)"
                required
              />
            </div>
            <div className="form-group">
              <label>Color Theme</label>
              <div className="color-picker">
                {['#6366F1', '#EC407A', '#42A5F5', '#AB47BC', '#FF7043', '#66BB6A'].map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`color-option ${formData.color === color ? 'active' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setFormData({...formData, color})}
                  />
                ))}
              </div>
            </div>
          </>
        )

      case 'projects':
        return (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Project Name *</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Color Theme</label>
                <div className="color-picker">
                  {['#6366F1', '#EC407A', '#42A5F5', '#AB47BC', '#FF7043', '#66BB6A'].map(color => (
                    <button
                      key={color}
                      type="button"
                      className={`color-option ${formData.color === color ? 'active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setFormData({...formData, color})}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Description *</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="3"
                required
              />
            </div>
            <div className="form-group">
              <label>Platforms</label>
              <div className="platform-selector">
                {['Android', 'iOS'].map(platform => (
                  <label key={platform} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={(formData.platforms || []).includes(platform)}
                      onChange={() => togglePlatform(platform)}
                    />
                    {platform}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Google Play URL</label>
                <input
                  type="url"
                  value={formData.android_url || ''}
                  onChange={(e) => setFormData({...formData, android_url: e.target.value})}
                  placeholder="https://play.google.com/..."
                />
              </div>
              <div className="form-group">
                <label>App Store URL</label>
                <input
                  type="url"
                  value={formData.ios_url || ''}
                  onChange={(e) => setFormData({...formData, ios_url: e.target.value})}
                  placeholder="https://apps.apple.com/..."
                />
              </div>
            </div>
          </>
        )

      case 'education':
        return (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Degree *</label>
                <input
                  type="text"
                  value={formData.degree || ''}
                  onChange={(e) => setFormData({...formData, degree: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>School *</label>
                <input
                  type="text"
                  value={formData.school || ''}
                  onChange={(e) => setFormData({...formData, school: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Period *</label>
                <input
                  type="text"
                  value={formData.period || ''}
                  onChange={(e) => setFormData({...formData, period: e.target.value})}
                  placeholder="e.g., 2019 - 2023"
                  required
                />
              </div>
              <div className="form-group">
                <label>GPA</label>
                <input
                  type="text"
                  value={formData.gpa || ''}
                  onChange={(e) => setFormData({...formData, gpa: e.target.value})}
                  placeholder="e.g., 3.0"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Details/Achievements</label>
              <textarea
                value={Array.isArray(formData.details) ? formData.details.join('\n') : (formData.details || '')}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
                rows="3"
                placeholder="One achievement per line"
              />
            </div>
          </>
        )

      case 'skills':
        return (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Skill Name *</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Flutter, Dart, Firebase"
                  required
                />
              </div>
              <div className="form-group">
                <label>Proficiency Level: {formData.level || 80}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.level || 80}
                  onChange={(e) => setFormData({...formData, level: parseInt(e.target.value)})}
                  className="range-input"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Color Theme</label>
              <div className="color-picker">
                {['#42A5F5', '#00B4AB', '#FFCA28', '#F05032', '#AB47BC', '#66BB6A', '#FF7043', '#EC407A'].map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`color-option ${formData.color === color ? 'active' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setFormData({...formData, color})}
                  />
                ))}
              </div>
            </div>
          </>
        )

      case 'profile':
        return (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Professional Title *</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Flutter Developer | Software Engineer"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Professional Summary</label>
              <textarea
                value={formData.summary || ''}
                onChange={(e) => setFormData({...formData, summary: e.target.value})}
                rows="4"
                placeholder="Brief description about yourself"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g., Cairo, Egypt"
                />
              </div>
              <div className="form-group">
                <label>LinkedIn Username</label>
                <input
                  type="text"
                  value={formData.linkedin || ''}
                  onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                  placeholder="e.g., amr-atef"
                />
              </div>
            </div>
          </>
        )

      default:
        return null
    }
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'experiences':
        return (
          <div className="items-list">
            {experiences.map((item) => (
              <motion.div 
                key={item.id}
                className="item-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ x: 5 }}
                style={{ borderLeft: `4px solid ${item.color}` }}
              >
                <div className="card-header">
                  <div className="card-title">
                    <h3>{item.role}</h3>
                    <span className="company">{item.company}</span>
                  </div>
                  <div className="card-actions">
                    <button onClick={() => handleEdit(item)} className="action-btn edit">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="action-btn delete">
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="card-meta">
                  <span>📍 {item.location}</span>
                  <span>📅 {item.period}</span>
                </div>
                <div className="card-description">{item.description}</div>
              </motion.div>
            ))}
          </div>
        )

      case 'projects':
        return (
          <div className="items-grid">
            {projects.map((item) => (
              <motion.div 
                key={item.id}
                className="project-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
              >
                <div className="project-header">
                  <h3>{item.name}</h3>
                  <div className="card-actions">
                    <button onClick={() => handleEdit(item)} className="action-btn edit">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="action-btn delete">
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p>{item.description}</p>
                <div className="project-meta">
                  {(item.platforms || []).map(p => (
                    <span key={p} className="platform-tag">{p}</span>
                  ))}
                </div>
                <div className="project-links">
                  {item.android_url && <a href={item.android_url} target="_blank" rel="noopener noreferrer"><FaGooglePlay /></a>}
                  {item.ios_url && <a href={item.ios_url} target="_blank" rel="noopener noreferrer"><FaApple /></a>}
                </div>
              </motion.div>
            ))}
          </div>
        )

      case 'education':
        return (
          <div className="items-list">
            {education.map((item) => (
              <motion.div 
                key={item.id}
                className="item-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ x: 5 }}
              >
                <div className="card-header">
                  <div className="card-title">
                    <h3>{item.degree}</h3>
                    <span className="school">{item.school}</span>
                  </div>
                  <div className="card-actions">
                    <button onClick={() => handleEdit(item)} className="action-btn edit">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="action-btn delete">
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="card-meta">
                  <span>📅 {item.period}</span>
                  {item.gpa && <span>GPA: {item.gpa}</span>}
                </div>
                {item.details && item.details.length > 0 && (
                  <div className="card-description">
                    {item.details.map((d, i) => (
                      <div key={i}>• {d}</div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )

      case 'skills':
        return (
          <div className="skills-list">
            {skills.map((item) => (
              <motion.div 
                key={item.id}
                className="skill-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="skill-info">
                  <h4>{item.name}</h4>
                  <span>{item.level}%</span>
                </div>
                <div className="skill-bar-container">
                  <div 
                    className="skill-bar-fill" 
                    style={{ width: `${item.level}%`, backgroundColor: item.color }}
                  />
                </div>
                <div className="card-actions">
                  <button onClick={() => handleEdit(item)} className="action-btn edit">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="action-btn delete">
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )

      case 'profile':
        return (
          <div className="profile-preview">
            <div className="profile-card">
              <div className="profile-avatar">
                {profile?.name?.charAt(0) || 'A'}
              </div>
              <h2>{profile?.name || 'Your Name'}</h2>
              <p className="profile-title">{profile?.title || 'Professional Title'}</p>
              <p className="profile-summary">{profile?.summary || 'Professional summary will appear here'}</p>
              <div className="profile-details">
                {profile?.email && <div>📧 {profile.email}</div>}
                {profile?.phone && <div>📱 {profile.phone}</div>}
                {profile?.location && <div>📍 {profile.location}</div>}
                {profile?.linkedin && <div>💼 linkedin.com/in/{profile.linkedin}</div>}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>🚀 CV Admin</h2>
        </div>
        <nav className="sidebar-nav">
          <button 
            onClick={() => setActiveTab('experiences')} 
            className={`nav-item ${activeTab === 'experiences' ? 'active' : ''}`}
          >
            <span>💼</span> Experience
          </button>
          <button 
            onClick={() => setActiveTab('projects')} 
            className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
          >
            <span>🚀</span> Projects
          </button>
          <button 
            onClick={() => setActiveTab('education')} 
            className={`nav-item ${activeTab === 'education' ? 'active' : ''}`}
          >
            <span>🎓</span> Education
          </button>
          <button 
            onClick={() => setActiveTab('skills')} 
            className={`nav-item ${activeTab === 'skills' ? 'active' : ''}`}
          >
            <span>⚡</span> Skills
          </button>
          <button 
            onClick={() => setActiveTab('profile')} 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
          >
            <span>👤</span> Profile
          </button>
        </nav>
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user?.email?.[0]?.toUpperCase()}</div>
            <span>{user?.email}</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Sign Out
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>
            {activeTab === 'experiences' && 'Work Experience'}
            {activeTab === 'projects' && 'Projects'}
            {activeTab === 'education' && 'Education'}
            {activeTab === 'skills' && 'Skills'}
            {activeTab === 'profile' && 'Profile'}
          </h1>
          {activeTab !== 'profile' && (
            <motion.button 
              className="add-btn"
              onClick={handleAdd}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlus /> Add {activeTab === 'experiences' ? 'Experience' : activeTab.slice(0, -1)}
            </motion.button>
          )}
          {activeTab === 'profile' && (
            <motion.button 
              className="add-btn"
              onClick={handleAdd}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEdit /> Edit Profile
            </motion.button>
          )}
        </header>

        <AnimatePresence>
          {showForm && (
            <motion.div 
              className="form-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => e.target === e.currentTarget && resetForm()}
            >
              <motion.div 
                className="form-modal"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="modal-header">
                  <h2>{editingId ? 'Edit' : 'Add'} {activeTab === 'experiences' ? 'Experience' : activeTab.slice(0, -1)}</h2>
                  <button onClick={resetForm}><FaTimes /></button>
                </div>
                <form onSubmit={handleSubmit}>
                  {renderForm()}
                  <div className="modal-actions">
                    <button type="button" onClick={resetForm} className="cancel-btn">Cancel</button>
                    <motion.button 
                      type="submit" 
                      className="submit-btn"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaSave /> {editingId ? 'Update' : 'Create'}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="content-section">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              {activeTab === 'profile' && !profile && (
                <div className="empty-state">
                  <p>No profile yet. Click "Edit Profile" to create one!</p>
                </div>
              )}
              {activeTab === 'profile' && profile && renderContent()}
              {activeTab !== 'profile' && (
                Array.isArray(experiences) && experiences.length === 0 && 
                Array.isArray(projects) && projects.length === 0 && 
                Array.isArray(education) && education.length === 0 && 
                Array.isArray(skills) && skills.length === 0 ? (
                  <div className="empty-state">
                    <p>No {activeTab} yet. Add your first one!</p>
                  </div>
                ) : renderContent()
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
