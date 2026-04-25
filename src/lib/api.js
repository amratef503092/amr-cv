import { supabase } from './supabaseClient'

// Check if Supabase is configured
const isConfigured = () => {
  if (!supabase) {
    console.warn('Supabase not configured - using demo data')
    return false
  }
  return true
}

// Experience CRUD
export const getExperiences = async () => {
  if (!isConfigured()) return null
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      console.error('Error loading experiences:', error.message)
      return null
    }
    return data
  } catch (error) {
    console.error('Error loading experiences:', error.message)
    return null
  }
}

export const addExperience = async (experience) => {
  if (!isConfigured()) return null
  const { data, error } = await supabase
    .from('experiences')
    .insert([experience])
    .select()
  if (error) throw error
  return data
}

export const updateExperience = async (id, experience) => {
  if (!isConfigured()) return null
  const { data, error } = await supabase
    .from('experiences')
    .update(experience)
    .eq('id', id)
    .select()
  if (error) throw error
  return data
}

export const deleteExperience = async (id) => {
  if (!isConfigured()) return null
  const { error } = await supabase
    .from('experiences')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// Projects CRUD
export const getProjects = async () => {
  if (!isConfigured()) return null
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      console.error('Error loading projects:', error.message)
      return null
    }
    return data
  } catch (error) {
    console.error('Error loading projects:', error.message)
    return null
  }
}

export const addProject = async (project) => {
  if (!isConfigured()) return null
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
  if (error) throw error
  return data
}

export const updateProject = async (id, project) => {
  if (!isConfigured()) return null
  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select()
  if (error) throw error
  return data
}

export const deleteProject = async (id) => {
  if (!isConfigured()) return null
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// Education CRUD
export const getEducation = async () => {
  if (!isConfigured()) return null
  try {
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      console.error('Error loading education:', error.message)
      return null
    }
    return data
  } catch (error) {
    console.error('Error loading education:', error.message)
    return null
  }
}

export const addEducation = async (education) => {
  if (!isConfigured()) return null
  const { data, error } = await supabase
    .from('education')
    .insert([education])
    .select()
  if (error) throw error
  return data
}

export const updateEducation = async (id, education) => {
  if (!isConfigured()) return null
  const { data, error } = await supabase
    .from('education')
    .update(education)
    .eq('id', id)
    .select()
  if (error) throw error
  return data
}

export const deleteEducation = async (id) => {
  if (!isConfigured()) return null
  const { error } = await supabase
    .from('education')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// Skills CRUD
export const getSkills = async () => {
  if (!isConfigured()) return null
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('order_index', { ascending: true })
    if (error) {
      console.error('Error loading skills:', error.message)
      return null
    }
    return data
  } catch (error) {
    console.error('Error loading skills:', error.message)
    return null
  }
}

export const addSkill = async (skill) => {
  if (!isConfigured()) return null
  const { data, error } = await supabase
    .from('skills')
    .insert([skill])
    .select()
  if (error) throw error
  return data
}

export const updateSkill = async (id, skill) => {
  if (!isConfigured()) return null
  const { data, error } = await supabase
    .from('skills')
    .update(skill)
    .eq('id', id)
    .select()
  if (error) throw error
  return data
}

export const deleteSkill = async (id) => {
  if (!isConfigured()) return null
  const { error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// Profile/CV Info
export const getProfile = async () => {
  if (!isConfigured()) return null
  try {
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .single()
    if (error && error.code !== 'PGRST116') {
      console.error('Error loading profile:', error.message)
      return null
    }
    return data
  } catch (error) {
    console.error('Error loading profile:', error.message)
    return null
  }
}

export const updateProfile = async (profile) => {
  if (!isConfigured()) return null
  const { data, error } = await supabase
    .from('profile')
    .upsert(profile)
    .select()
  if (error) throw error
  return data
}
