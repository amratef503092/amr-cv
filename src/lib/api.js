import { supabase } from '../lib/supabaseClient'

// Experience CRUD
export const getExperiences = async () => {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('start_date', { ascending: false })
  if (error) throw error
  return data
}

export const addExperience = async (experience) => {
  const { data, error } = await supabase
    .from('experiences')
    .insert([experience])
    .select()
  if (error) throw error
  return data
}

export const updateExperience = async (id, experience) => {
  const { data, error } = await supabase
    .from('experiences')
    .update(experience)
    .eq('id', id)
    .select()
  if (error) throw error
  return data
}

export const deleteExperience = async (id) => {
  const { error } = await supabase
    .from('experiences')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// Projects CRUD
export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export const addProject = async (project) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
  if (error) throw error
  return data
}

export const updateProject = async (id, project) => {
  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select()
  if (error) throw error
  return data
}

export const deleteProject = async (id) => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// Education CRUD
export const getEducation = async () => {
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .order('end_date', { ascending: false })
  if (error) throw error
  return data
}

export const addEducation = async (education) => {
  const { data, error } = await supabase
    .from('education')
    .insert([education])
    .select()
  if (error) throw error
  return data
}

export const updateEducation = async (id, education) => {
  const { data, error } = await supabase
    .from('education')
    .update(education)
    .eq('id', id)
    .select()
  if (error) throw error
  return data
}

export const deleteEducation = async (id) => {
  const { error } = await supabase
    .from('education')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// Skills CRUD
export const getSkills = async () => {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('level', { ascending: false })
  if (error) throw error
  return data
}

export const addSkill = async (skill) => {
  const { data, error } = await supabase
    .from('skills')
    .insert([skill])
    .select()
  if (error) throw error
  return data
}

export const updateSkill = async (id, skill) => {
  const { data, error } = await supabase
    .from('skills')
    .update(skill)
    .eq('id', id)
    .select()
  if (error) throw error
  return data
}

export const deleteSkill = async (id) => {
  const { error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// Profile/CV Info
export const getProfile = async () => {
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .single()
  if (error && error.code !== 'PGRST116') throw error
  return data
}

export const updateProfile = async (profile) => {
  const { data, error } = await supabase
    .from('profile')
    .upsert(profile)
    .select()
  if (error) throw error
  return data
}
