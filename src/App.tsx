import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CommunitiesPage from './components/community/CommunitiesPage'
import CommunityPage from './components/community/CommunityPage'
import CommunityDetail from './components/community/CommunityDetail'
import ProjectDetail from './components/community/ProjectDetail'
import OpenSpacesPage from './components/community/OpenSpacesPage'
import SignInPage from './components/auth/SignInPage'
import LandingPage from './components/landing/LandingPage'
import { OnboardingFlow } from './components/signin/OnboardingFlow'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CommunityPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/communities" element={<CommunitiesPage />} />
      <Route path="/community/:communityId" element={<CommunityDetail />} />
      <Route path="/community/project/:projectId" element={<ProjectDetail />} />
      <Route path="/open-spaces" element={<OpenSpacesPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/onboarding" element={<OnboardingFlow onComplete={() => {}} onCancel={() => {}} />} />
    </Routes>
  )
}

export default App
