  const state = {
            streak: 0,
            challenges: [
                { icon: '💧', title: '7-Day Hydration', desc: 'Drink 8 glasses daily', progress: 0, total: 7, joined: false },
                { icon: '🏃‍♂️', title: '5k Steps Daily', desc: 'Walk 5000 steps every day', progress: 0, total: 7, joined: false },
                { icon: '🍎', title: 'Eat Clean for 5 Days', desc: 'Healthy meals only', progress: 0, total: 5, joined: false },
                { icon: '🧘‍♀️', title: 'Meditation Week', desc: '10 minutes daily meditation', progress: 0, total: 7, joined: false }
            ],
            achievements: [
                { icon: '🏅', title: '7-Day Hydration Master', desc: 'Complete hydration challenge', unlocked: false },
                { icon: '💬', title: 'First Community Post', desc: 'Unlocked!', unlocked: true },
                { icon: '❤️', title: '10 Likes Received', desc: 'Get 10 likes', unlocked: false },
                { icon: '🔥', title: 'Week Streak Champion', desc: '7-day streak', unlocked: false }
            ],
            posts: [
                {
                    author: 'Sarah Anderson',
                    initials: 'SA',
                    time: '2 hours ago',
                    category: 'Fitness',
                    content: 'Just completed my first 5K run! The journey from couch to 5K took 8 weeks, but every step was worth it. Feeling stronger and more energized than ever! 💪',
                    likes: 24,
                    liked: false,
                    comments: []
                },
                {
                    author: 'Michael Johnson',
                    initials: 'MJ',
                    time: '5 hours ago',
                    category: 'Mental Health',
                    content: 'Started daily meditation practice this month. The difference in my stress levels and focus is remarkable. 10 minutes can truly change your day. 🧘‍♂️',
                    likes: 18,
                    liked: false,
                    comments: []
                }
            ]
        };

        // Initialize
        function init() {
            renderChallenges();
            renderAchievements();
            renderPosts();
            updateStreakDisplay();
        }

        // Challenges
        function renderChallenges() {
            const grid = document.getElementById('challengesGrid');
            grid.innerHTML = state.challenges.map((ch, idx) => `
                <div class="challenge-card">
                    <div class="challenge-icon">${ch.icon}</div>
                    <h3 class="challenge-title">${ch.title}</h3>
                    <p>${ch.desc}</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(ch.progress / ch.total) * 100}%"></div>
                    </div>
                    <p style="opacity: 0.7; font-size: 0.9em; margin: 10px 0;">Progress: <span class="progress-text">${ch.progress}/${ch.total}</span> days</p>
                    <button class="btn-join ${ch.joined ? 'joined' : ''}" onclick="joinChallenge(${idx})">
                        ${ch.joined ? '✓ Track Progress' : 'Join Challenge'}
                    </button>
                </div>
            `).join('');
        }

        function joinChallenge(idx) {
            const challenge = state.challenges[idx];
            if (!challenge.joined) {
                challenge.joined = true;
                showNotification('Challenge joined! Start tracking your progress.');
            } else {
                if (challenge.progress < challenge.total) {
                    challenge.progress++;
                    if (challenge.progress === challenge.total) {
                        showNotification('🎉 Challenge completed!');
                        if (idx === 0) state.achievements[0].unlocked = true;
                        renderAchievements();
                        createConfetti();
                    }
                }
            }
            renderChallenges();
        }

        // Streak
        function claimDailyStreak() {
            if (state.streak < 7) {
                state.streak++;
                updateStreakDisplay();
                showNotification('🔥 Daily streak claimed!');
                if (state.streak === 7) {
                    state.achievements[3].unlocked = true;
                    renderAchievements();
                    createConfetti();
                    showNotification('🎉 Week Streak Champion unlocked!');
                }
            } else {
                showNotification('You\'ve completed your 7-day streak!');
            }
        }

        function updateStreakDisplay() {
            document.getElementById('streakDays').textContent = state.streak;
            const circle = document.getElementById('progressCircle');
            const offset = 565.48 - (565.48 * state.streak) / 7;
            circle.style.strokeDashoffset = offset;
        }

        // Achievements
        function renderAchievements() {
            const grid = document.getElementById('achievementsGrid');
            grid.innerHTML = state.achievements.map(ach => `
                <div class="achievement" style="opacity: ${ach.unlocked ? 1 : 0.5}">
                    <div style="font-size: 2em;">${ach.icon}</div>
                    <div>${ach.title}</div>
                    <small style="opacity: 0.6;">${ach.desc}</small>
                </div>
            `).join('');
        }

        // Posts
        function renderPosts() {
            const feed = document.getElementById('postsFeed');
            feed.innerHTML = state.posts.map((post, idx) => `
                <div class="post-card">
                    <div class="post-header">
                        <div class="avatar">${post.initials}</div>
                        <div class="post-meta">
                            <div class="post-author">${post.author}</div>
                            <div class="post-time">${post.time}</div>
                        </div>
                        <span class="post-category">${post.category}</span>
                    </div>
                    <div class="post-content">${post.content}</div>
                    <div class="post-actions">
                        <button class="action-btn ${post.liked ? 'active' : ''}" onclick="likePost(${idx})">
                            <span>❤️</span>
                            <span class="like-count">${post.likes}</span>
                        </button>
                        <button class="action-btn" onclick="toggleComments(${idx})">
                            <span>💬</span>
                            <span>${post.comments.length || 'Comment'}</span>
                        </button>
                        <button class="action-btn" onclick="sharePost(${idx})">
                            <span>🔄</span>
                            <span>Share</span>
                        </button>
                        <button class="report-btn" onclick="reportPost()">⚠️ Report</button>
                    </div>
                    <div class="comment-section hidden" id="comments-${idx}">
                        <textarea class="form-control" id="comment-input-${idx}" placeholder="Write a comment..." rows="2"></textarea>
                        <button class="btn-primary" style="margin-top: 10px; padding: 10px 20px; font-size: 0.9em;" onclick="addComment(${idx})">Post Comment</button>
                        <div class="comments-list" id="comments-list-${idx}">
                            ${post.comments.map(c => `
                                <div class="comment">
                                    <strong style="color: #00e5ff;">${c.author}</strong>
                                    <p style="margin-top: 5px;">${c.text}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function likePost(idx) {
            const post = state.posts[idx];
            if (!post.liked) {
                post.likes++;
                post.liked = true;
                
                // Check for achievement
                const totalLikes = state.posts.reduce((sum, p) => sum + (p.liked ? 1 : 0), 0);
                if (totalLikes >= 10 && !state.achievements[2].unlocked) {
                    state.achievements[2].unlocked = true;
                    renderAchievements();
                    showNotification('🎉 10 Likes Received achievement unlocked!');
                }
            } else {
                post.likes--;
                post.liked = false;
            }
            renderPosts();
        }

        function toggleComments(idx) {
            const section = document.getElementById(`comments-${idx}`);
            section.classList.toggle('hidden');
        }

        function addComment(idx) {
            const input = document.getElementById(`comment-input-${idx}`);
            const text = input.value.trim();
            if (text) {
                state.posts[idx].comments.push({
                    author: 'You',
                    text: text
                });
                input.value = '';
                renderPosts();
                showNotification('Comment posted!');
            }
        }

        function sharePost(idx) {
            showNotification('Post shared to your timeline!');
        }

        function reportPost() {
            showNotification('Thank you for reporting. Our team will review this content.');
        }

        // Create Post Modal
        function openCreatePostModal() {
            document.getElementById('createPostModal').classList.add('active');
        }

        function closeCreatePostModal() {
            document.getElementById('createPostModal').classList.remove('active');
        }

        function createPost() {
            const category = document.getElementById('postCategory').value;
            const content = document.getElementById('postContent').value.trim();
            
            if (content) {
                state.posts.unshift({
                    author: 'You',
                    initials: 'YO',
                    time: 'Just now',
                    category: category,
                    content: content,
                    likes: 0,
                    liked: false,
                    comments: []
                });
                
                document.getElementById('postContent').value = '';
                closeCreatePostModal();
                renderPosts();
                showNotification('🎉 Post created successfully!');
                createConfetti();
            }
        }

        // Utilities
        function showNotification(message) {
            const notif = document.createElement('div');
            notif.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #00e5ff, #4dd0e1);
                color: #0d1117;
                padding: 15px 25px;
                border-radius: 10px;
                font-weight: 600;
                z-index: 10000;
                animation: slideIn 0.3s ease;
                box-shadow: 0 0 20px rgba(0,229,255,0.5);
            `;
            notif.textContent = message;
            document.body.appendChild(notif);
            
            setTimeout(() => {
                notif.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notif.remove(), 300);
            }, 3000);
        }

        function createConfetti() {
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = Math.random() * 100 + '%';
                    confetti.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
                    confetti.style.animationDelay = Math.random() * 0.3 + 's';
                    document.body.appendChild(confetti);
                    setTimeout(() => confetti.remove(), 1000);
                }, i * 20);
            }
        }

        // Close modal on outside click
        window.onclick = function(event) {
            const modal = document.getElementById('createPostModal');
            if (event.target === modal) {
                closeCreatePostModal();
            }
        }

        // Add animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        // Initialize app
        init();