import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { getExperiences, addExperience, updateExperience, deleteExperience } from '../../lib/api'
import { motion, AnimatePresence } from 'framer-motion'
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes } from 'react-icons/fa'
import './Dashboard.css'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [experiences, setExperiences] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    period: '',
    location: '',
    description: '',
    color: '#6366F1'
  })

  useEffect(() => {
    loadExperiences()
  }, [])

  const loadExperiences = async () => {
    try {
      const data = await getExperiences()
      setExperiences(data || [])
    } catch (error) {
      console.error('Error loading experiences:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updateExperience(editingId, formData)
      } else {
        await addExperience(formData)
      }
      loadExperiences()
      resetForm()
    } catch (error) {
      console.error('Error saving experience:', error)
      alert('Failed to save experience')
    }
  }

  const handleEdit = (exp) => {
    setFormData({
      company: exp.company,
      role: exp.role,
      period: exp.period,
      location: exp.location,
      description: exp.description,
      color: exp.color
    })
    setEditingId(exp.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this experience?')) return
    try {
      await deleteExperience(id)
      loadExperiences()
    } catch (error) {
      console.error('Error deleting experience:', error)
      alert('Failed to delete experience')
    }
  }

  const resetForm = () => {
    setFormData({
      company: '',
      role: '',
      period: '',
      location: '',
      description: '',
      color: '#6366F1'
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>🚀 CV Admin</h2>
        </div>
        <nav className="sidebar-nav">
          <a href="#experiences" className="nav-item active">
            <span>💼</span> Experience
          </a>
          <a href="#projects" className="nav-item">
            <span>🚀</span> Projects
          </a>
          <a href="#education" className="nav-item">
            <span>🎓</span> Education
          </a>
          <a href="#skills" className="nav-item">
            <span>⚡</span> Skills
          </a>
          <a href="#profile" className="nav-item">
            <span>👤</span> Profile
          </a>
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
          <h1>Work Experience</h1>
          <motion.button 
            className="add-btn"
            onClick={() => setShowForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus /> Add Experience
          </motion.button>
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
                  <h2>{editingId ? 'Edit' : 'Add'} Experience</h2>
                  <button onClick={resetForm}><FaTimes /></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Company *</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Role *</label>
                      <input
                        type="text"
                        value={formData.role}
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
                        value={formData.period}
                        onChange={(e) => setFormData({...formData, period: e.target.value})}
                        placeholder="e.g., Jan 2024 - Present"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Location *</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description *</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows="4"
                      placeholder="Enter key responsibilities and achievements (separate with line breaks)"
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
          ) : experiences.length === 0 ? (
            <div className="empty-state">
              <p>No experiences yet. Add your first one!</p>
            </div>
          ) : (
            <div className="experiences-list">
              {experiences.map((exp) => (
                <motion.div 
                  key={exp.id}
                  className="experience-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="card-header">
                    <div className="card-title">
                      <h3>{exp.role}</h3>
                      <span className="company">{exp.company}</span>
                    </div>
                    <div className="card-actions">
                      <button onClick={() => handleEdit(exp)} className="action-btn edit">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(exp.id)} className="action-btn delete">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <div className="card-meta">
                    <span>📍 {exp.location}</span>
                    <span>📅 {exp.period}</span>
                  </div>
                  <div className="card-description">
                    {exp.description}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
