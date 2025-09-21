// Global state
let currentUser = null;
let currentPage = 'login';
let selectedCourse = null;
let selectedCollege = null;
let selectedScholarship = null;
let selectedClass = '';
let likedItems = {
  courses: [],
  colleges: [],
  scholarships: []
};

// Toast functionality
function showToast(message, type = 'success') {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `p-3 rounded-md shadow-lg transition-all duration-300 ${
    type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
  }`;
  toast.textContent = message;
  
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, 300);
  }, 3000);
}

// Local storage helpers
function saveUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function loadUser() {
  const saved = localStorage.getItem('user');
  return saved ? JSON.parse(saved) : null;
}

function saveLikes() {
  if (currentUser) {
    localStorage.setItem(`likes_${currentUser.name}`, JSON.stringify(likedItems));
  }
}

function loadLikes() {
  if (currentUser) {
    const saved = localStorage.getItem(`likes_${currentUser.name}`);
    likedItems = saved ? JSON.parse(saved) : { courses: [], colleges: [], scholarships: [] };
  }
}

// Personalization helpers
function getPersonalizedGreeting() {
  if (!currentUser) return '';
  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  return `${timeGreeting}, ${currentUser.name}!`;
}

function getMotivationalMessage() {
  const messages = [
    "Every expert was once a beginner. Keep going! 🌟",
    "Your dreams are valid. Work towards them every day! 💪",
    "Success is not final, failure is not fatal. Keep learning! 📚",
    "Believe in yourself and take the next step! ✨",
    "Your future starts with the choices you make today! 🚀"
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

function getPersonalizedMessage(type = 'general') {
  if (!currentUser) return '';
  
  const genderMessages = {
    female: "💪 Women are leading in every field today! You have unlimited potential.",
    male: "💪 You have unlimited potential to achieve great things!"
  };
  
  const categoryMessages = {
    sc: "🎯 Special opportunities and scholarships await to support your ambitions.",
    st: "🌟 Your unique background is a strength that will enrich any field you choose.",
    obc: "📈 Enhanced opportunities through reservations can accelerate your success.",
    ews: "💡 Merit-based support and scholarships make quality education accessible.",
    general: "🚀 Your journey to success starts with the right choices today!"
  };
  
  return `${genderMessages[currentUser.gender] || genderMessages.male} ${categoryMessages[currentUser.caste]}`;
}

// Navigation
function navigate(page, data = {}) {
  currentPage = page;
  if (data.course) selectedCourse = data.course;
  if (data.college) selectedCollege = data.college;
  if (data.scholarship) selectedScholarship = data.scholarship;
  if (data.class) selectedClass = data.class;
  
  renderCurrentPage();
}

function logout() {
  currentUser = null;
  localStorage.removeItem('user');
  navigate('login');
}

// Like/Unlike functionality
function toggleLike(type, id) {
  const index = likedItems[type].indexOf(id);
  if (index > -1) {
    likedItems[type].splice(index, 1);
    showToast(`Removed from liked ${type}`);
  } else {
    likedItems[type].push(id);
    showToast(`Added to liked ${type}`);
  }
  saveLikes();
  renderCurrentPage(); // Refresh the page to update like status
}

// Page renderers
function renderLogin() {
  const app = document.getElementById('app');
  const template = document.getElementById('login-template');
  app.innerHTML = template.innerHTML;
  
  const form = document.getElementById('login-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const userData = {
      name: formData.get('name') || document.getElementById('name').value,
      location: formData.get('location') || document.getElementById('location').value,
      gender: formData.get('gender') || document.getElementById('gender').value,
      caste: formData.get('caste') || document.getElementById('caste').value
    };
    
    if (userData.name && userData.location && userData.gender && userData.caste) {
      currentUser = userData;
      saveUser(userData);
      loadLikes();
      navigate('dashboard');
    }
  });
}

function renderDashboard() {
  const app = document.getElementById('app');
  loadLikes();
  
  app.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <!-- Header -->
      <header class="bg-white/90 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
              </svg>
            </div>
            <h1 class="text-xl text-gray-800">Career Guide</h1>
          </div>
          
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span>${currentUser.name}</span>
              <span>•</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>${currentUser.location}</span>
            </div>
            <button 
              onclick="logout()"
              class="flex items-center gap-2 px-3 py-1 text-sm border border-amber-200 hover:bg-amber-50 rounded-md transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main class="container mx-auto px-4 py-8">
        <!-- Welcome Section -->
        <div class="mb-8">
          <div class="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 rounded-lg p-6">
            <h2 class="text-2xl mb-2">${getPersonalizedGreeting()}</h2>
            <p class="text-amber-100 mb-4">${getMotivationalMessage()}</p>
            <div class="grid md:grid-cols-3 gap-4">
              <button 
                onclick="navigate('career-guidance')"
                class="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white border-0 rounded-md transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                Career Guidance
              </button>
              <button 
                onclick="navigate('quiz')"
                class="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white border-0 rounded-md transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
                Take Quiz
              </button>
              <button 
                onclick="showToast('Profile editing coming soon!')"
                class="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white border-0 rounded-md transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="mb-6">
          <div class="border-b border-amber-200">
            <nav class="-mb-px flex space-x-8">
              <button 
                id="search-tab"
                onclick="switchTab('search')"
                class="tab-button active py-2 px-1 border-b-2 border-amber-500 text-amber-600 text-sm font-medium"
              >
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Search & Explore
              </button>
              <button 
                id="liked-tab"
                onclick="switchTab('liked')"
                class="tab-button py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 text-sm font-medium"
              >
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                Liked Items
              </button>
            </nav>
          </div>
        </div>

        <!-- Tab Content -->
        <div id="search-content" class="tab-content">
          <!-- Search Bar -->
          <div class="mb-6">
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input
                id="search-input"
                type="text"
                placeholder="Search courses, colleges, scholarships..."
                class="w-full pl-10 pr-4 py-2 bg-white border border-amber-200 rounded-md focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
                oninput="performSearch()"
              />
            </div>
          </div>

          <!-- Search Results -->
          <div id="search-results">
            ${renderSearchResults()}
          </div>
        </div>

        <div id="liked-content" class="tab-content hidden">
          ${renderLikedItems()}
        </div>
      </main>
    </div>
  `;
}

function renderSearchResults(query = '') {
  const courses = filterCourses(query);
  const colleges = filterColleges(query);
  const scholarships = filterScholarships(query);
  
  return `
    <!-- Sub Tabs -->
    <div class="mb-6">
      <div class="border-b border-amber-200">
        <nav class="-mb-px flex space-x-8">
          <button 
            id="courses-subtab"
            onclick="switchSubTab('courses')"
            class="subtab-button active py-2 px-1 border-b-2 border-amber-500 text-amber-600 text-sm font-medium"
          >
            Courses (${courses.length})
          </button>
          <button 
            id="colleges-subtab"
            onclick="switchSubTab('colleges')"
            class="subtab-button py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 text-sm font-medium"
          >
            Colleges (${colleges.length})
          </button>
          <button 
            id="scholarships-subtab"
            onclick="switchSubTab('scholarships')"
            class="subtab-button py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 text-sm font-medium"
          >
            Scholarships (${scholarships.length})
          </button>
        </nav>
      </div>
    </div>

    <!-- Sub Tab Content -->
    <div id="courses-subcontent" class="subtab-content">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${courses.map(course => renderCourseCard(course)).join('')}
      </div>
    </div>

    <div id="colleges-subcontent" class="subtab-content hidden">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${colleges.map(college => renderCollegeCard(college)).join('')}
      </div>
    </div>

    <div id="scholarships-subcontent" class="subtab-content hidden">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${scholarships.map(scholarship => renderScholarshipCard(scholarship)).join('')}
      </div>
    </div>
  `;
}

function renderLikedItems() {
  const likedCourses = COURSES.filter(course => likedItems.courses.includes(course.id));
  const likedColleges = COLLEGES.filter(college => likedItems.colleges.includes(college.id));
  const likedScholarships = SCHOLARSHIPS.filter(scholarship => likedItems.scholarships.includes(scholarship.id));
  
  if (likedCourses.length === 0 && likedColleges.length === 0 && likedScholarships.length === 0) {
    return `
      <div class="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-lg p-8 text-center">
        <svg class="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
        <h3 class="text-lg text-gray-600 mb-2">No liked items yet</h3>
        <p class="text-gray-500 mb-4">Start exploring and save your favorite courses, colleges, and scholarships!</p>
        <button 
          onclick="navigate('career-guidance')" 
          class="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-md transition-colors"
        >
          Explore Now
        </button>
      </div>
    `;
  }
  
  return `
    <div class="space-y-8">
      ${likedCourses.length > 0 ? `
        <div>
          <h3 class="text-lg text-gray-800 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            Liked Courses (${likedCourses.length})
          </h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${likedCourses.map(course => renderCourseCard(course)).join('')}
          </div>
        </div>
      ` : ''}
      
      ${likedColleges.length > 0 ? `
        <div>
          <h3 class="text-lg text-gray-800 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            Liked Colleges (${likedColleges.length})
          </h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${likedColleges.map(college => renderCollegeCard(college)).join('')}
          </div>
        </div>
      ` : ''}
      
      ${likedScholarships.length > 0 ? `
        <div>
          <h3 class="text-lg text-gray-800 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
            </svg>
            Liked Scholarships (${likedScholarships.length})
          </h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${likedScholarships.map(scholarship => renderScholarshipCard(scholarship)).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

// Card renderers
function renderCourseCard(course) {
  const isLiked = likedItems.courses.includes(course.id);
  return `
    <div class="bg-white/80 backdrop-blur-sm border border-amber-200 hover:shadow-lg transition-shadow rounded-lg">
      <div class="p-6 border-b border-amber-200">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="text-lg text-gray-800 mb-2">${course.name}</h3>
            <span class="inline-block px-2 py-1 bg-amber-100 text-amber-800 rounded text-sm">${course.category}</span>
          </div>
        </div>
      </div>
      <div class="p-6">
        <p class="text-gray-600 text-sm mb-4">${course.description}</p>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">${course.duration}</span>
          <div class="flex items-center gap-2">
            <button 
              onclick="toggleLike('courses', '${course.id}')"
              class="p-2 rounded-md ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} transition-colors"
              title="${isLiked ? 'Unlike' : 'Like'}"
            >
              <svg class="w-4 h-4 ${isLiked ? 'fill-current' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
            <button 
              onclick="navigate('course-detail', { course: ${JSON.stringify(course).replace(/"/g, '&quot;')} })"
              class="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded text-sm transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderCollegeCard(college) {
  const isLiked = likedItems.colleges.includes(college.id);
  return `
    <div class="bg-white/80 backdrop-blur-sm border border-amber-200 hover:shadow-lg transition-shadow rounded-lg">
      <div class="p-6 border-b border-amber-200">
        <h3 class="text-lg text-gray-800 mb-2">${college.name}</h3>
        <div class="flex items-center gap-2">
          <span class="inline-block px-2 py-1 ${college.type === 'Government' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'} rounded text-sm">
            ${college.type}
          </span>
          <div class="flex items-center gap-1">
            <svg class="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span class="text-sm">Rank #${college.ranking}</span>
          </div>
        </div>
      </div>
      <div class="p-6">
        <p class="text-gray-600 text-sm mb-2">📍 ${college.location}</p>
        <p class="text-gray-600 text-sm mb-4">💰 ${college.fees}</p>
        <div class="flex items-center justify-between">
          <button 
            onclick="toggleLike('colleges', '${college.id}')"
            class="p-2 rounded-md ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} transition-colors"
            title="${isLiked ? 'Unlike' : 'Like'}"
          >
            <svg class="w-4 h-4 ${isLiked ? 'fill-current' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </button>
          <button 
            onclick="navigate('college-detail', { college: ${JSON.stringify(college).replace(/"/g, '&quot;')} })"
            class="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded text-sm transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderScholarshipCard(scholarship) {
  const isLiked = likedItems.scholarships.includes(scholarship.id);
  return `
    <div class="bg-white/80 backdrop-blur-sm border border-amber-200 hover:shadow-lg transition-shadow rounded-lg">
      <div class="p-6 border-b border-amber-200">
        <h3 class="text-lg text-gray-800 mb-2">${scholarship.name}</h3>
        <span class="inline-block px-2 py-1 border border-amber-300 text-amber-700 rounded text-sm">
          ${scholarship.category}
        </span>
      </div>
      <div class="p-6">
        <p class="text-gray-600 text-sm mb-2">By: ${scholarship.provider}</p>
        <p class="font-medium text-green-600 mb-2">${scholarship.amount}</p>
        <p class="text-xs text-gray-500 mb-4">Deadline: ${scholarship.applicationDeadline}</p>
        <div class="flex items-center justify-between">
          <button 
            onclick="toggleLike('scholarships', '${scholarship.id}')"
            class="p-2 rounded-md ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} transition-colors"
            title="${isLiked ? 'Unlike' : 'Like'}"
          >
            <svg class="w-4 h-4 ${isLiked ? 'fill-current' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </button>
          <button 
            onclick="navigate('scholarship-detail', { scholarship: ${JSON.stringify(scholarship).replace(/"/g, '&quot;')} })"
            class="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded text-sm transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  `;
}

// Tab switching
function switchTab(tab) {
  // Update tab buttons
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active', 'border-amber-500', 'text-amber-600');
    btn.classList.add('border-transparent', 'text-gray-500');
  });
  
  document.getElementById(`${tab}-tab`).classList.add('active', 'border-amber-500', 'text-amber-600');
  document.getElementById(`${tab}-tab`).classList.remove('border-transparent', 'text-gray-500');
  
  // Update content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.add('hidden');
  });
  
  document.getElementById(`${tab}-content`).classList.remove('hidden');
}

function switchSubTab(subtab) {
  // Update subtab buttons
  document.querySelectorAll('.subtab-button').forEach(btn => {
    btn.classList.remove('active', 'border-amber-500', 'text-amber-600');
    btn.classList.add('border-transparent', 'text-gray-500');
  });
  
  document.getElementById(`${subtab}-subtab`).classList.add('active', 'border-amber-500', 'text-amber-600');
  document.getElementById(`${subtab}-subtab`).classList.remove('border-transparent', 'text-gray-500');
  
  // Update content
  document.querySelectorAll('.subtab-content').forEach(content => {
    content.classList.add('hidden');
  });
  
  document.getElementById(`${subtab}-subcontent`).classList.remove('hidden');
}

// Search functionality
function performSearch() {
  const query = document.getElementById('search-input').value;
  const searchResults = document.getElementById('search-results');
  searchResults.innerHTML = renderSearchResults(query);
}

// Continue with more page renderers...
// [This is getting quite long, so I'll continue in the next part]

// Main render function
function renderCurrentPage() {
  switch (currentPage) {
    case 'login':
      renderLogin();
      break;
    case 'dashboard':
      renderDashboard();
      break;
    case 'career-guidance':
      renderCareerGuidance();
      break;
    case 'quiz':
      renderQuiz();
      break;
    case 'course-detail':
      renderCourseDetail();
      break;
    case 'college-detail':
      renderCollegeDetail();
      break;
    case 'scholarship-detail':
      renderScholarshipDetail();
      break;
    default:
      renderDashboard();
  }
}

// Placeholder render functions (will be implemented)
function renderCareerGuidance() {
  showToast('Career Guidance page coming soon!');
  navigate('dashboard');
}

function renderQuiz() {
  showToast('Quiz page coming soon!');
  navigate('dashboard');
}

function renderCourseDetail() {
  showToast('Course Detail page coming soon!');
  navigate('dashboard');
}

function renderCollegeDetail() {
  showToast('College Detail page coming soon!');
  navigate('dashboard');
}

function renderScholarshipDetail() {
  showToast('Scholarship Detail page coming soon!');
  navigate('dashboard');
}

// Initialize app
function initApp() {
  const savedUser = loadUser();
  if (savedUser) {
    currentUser = savedUser;
    loadLikes();
    navigate('dashboard');
  } else {
    navigate('login');
  }
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);