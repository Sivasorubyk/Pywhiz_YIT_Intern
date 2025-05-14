import api from "./api"

// Types based on backend models
export interface Milestone {
  id: string
  title: string
  description: string
  order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface LearnContent {
  id: number
  milestone: string
  video_url: string
  audio_url: string | null
  transcript: string
  additional_resources: Record<string, any>
  created_at: string
  updated_at: string
}

export interface CodeQuestion {
  id: string
  milestone: string
  question: string
  example_code: string
  hint: string
  created_at: string
  updated_at: string
}

export interface MCQQuestion {
  id: string
  milestone: string
  question_text: string
  options: Record<string, string>
  correct_answer: string
  explanation: string
  order: number
  created_at: string
  updated_at: string
}

// Update the UserProgress interface to include the new fields
export interface UserProgress {
  user: {
    id: number
    username: string
    email: string
  }
  current_milestone: Milestone
  completed_milestones: Milestone[]
  watched_videos: string[] // Array of milestone IDs
  completed_code: string[] // Array of milestone IDs
  completed_exercises: string[] // Array of milestone IDs
  score: number
  created_at: string
  updated_at: string
}

export interface CodeSubmissionResponse {
  user_code: string
  output: string
  hints: string
  suggestions: string
  is_correct: boolean
  attempts: number
  status?: string
  message?: string
  stdout_so_far?: string
}

export interface MCQSubmissionResponse {
  is_correct: boolean
  correct_answer: string
  explanation: string
}

// New interface for personalized exercises
export interface PersonalizedExercise {
  id: string
  user: {
    id: number
    username: string
    email: string
  }
  question: string
  generated_code: string
  difficulty: "easy" | "medium" | "hard"
  output: string
  hints: string
  suggestions: string
  is_completed: boolean
  attempts: number
  created_at: string
  updated_at: string
  encouragement?: string
  focus_area?: string
  is_first_attempt?: boolean
  status?: string
  message?: string
  stdout_so_far?: string
}

// API functions
export const fetchMilestones = async (): Promise<Milestone[]> => {
  const response = await api.get("/learn/milestones/")
  return response.data
}

export const fetchLearnContent = async (milestoneId: string): Promise<LearnContent> => {
  const response = await api.get(`/learn/milestones/${milestoneId}/learn/`)
  return response.data
}

export const fetchCodeQuestions = async (milestoneId: string): Promise<CodeQuestion[]> => {
  const response = await api.get(`/learn/milestones/${milestoneId}/questions/`)
  return response.data
}

export const submitCode = async (
  questionId: string,
  code: string,
  inputs: string[] = [],
): Promise<CodeSubmissionResponse> => {
  const response = await api.post(`/learn/questions/${questionId}/submit/`, { code, inputs })
  return response.data
}

export const fetchMCQQuestions = async (milestoneId: string): Promise<MCQQuestion[]> => {
  const response = await api.get(`/learn/milestones/${milestoneId}/mcq-questions/`)
  return response.data
}

export const submitMCQAnswer = async (questionId: string, selectedOption: string): Promise<MCQSubmissionResponse> => {
  const response = await api.post(`/learn/mcq-questions/${questionId}/submit/`, { selected_option: selectedOption })
  return response.data
}

export const fetchUserProgress = async (): Promise<UserProgress> => {
  const response = await api.get("/learn/progress/")
  return response.data
}

export const updateCurrentMilestone = async (milestoneId: string): Promise<void> => {
  await api.post("/learn/progress/update-milestone/", { milestone_id: milestoneId })
}

// New API functions for personalized exercises
export const fetchPersonalizedExercises = async (): Promise<PersonalizedExercise[]> => {
  const response = await api.get("/learn/personalized-exercises/")
  return response.data
}

export const createPersonalizedExercise = async (data: {
  question: string
  difficulty: "easy" | "medium" | "hard"
}): Promise<PersonalizedExercise> => {
  const response = await api.post("/learn/personalized-exercises/", data)
  return response.data
}

export const submitPersonalizedExercise = async (
  exerciseId: string,
  code: string,
  inputs: string[] = [],
): Promise<PersonalizedExercise> => {
  const response = await api.post(`/learn/personalized-exercises/${exerciseId}/submit/`, { code, inputs })
  return response.data
}
