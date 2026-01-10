   let userData = {
            name: 'Muskan Gupta',
            age: 22,
            gender: 'Female',
            photo: null
        };
        let darkMode = true;
        let notifications = true;
        let biometric = false;
        let healthScore = 85;

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            animateHealthScore();
            setupEventListeners();
        });

        // Animate Health Score
        function animateHealthScore() {
            let current = 0;
            const target = healthScore;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                updateHealthScore(Math.round(current));
            }, 20);
        }

        function updateHealthScore(value) {
            const circumference = 2 * Math.PI * 65;
            const offset = circumference - (value / 100) * circumference;
            document.getElementById('progressCircle').style.strokeDashoffset = offset;
            document.getElementById('healthScoreValue').textContent = value;
            document.getElementById('badgeScore').textContent = value;
        }

        // Event Listeners
        function setupEventListeners() {
            // Theme Toggle
            document.getElementById('themeToggle').addEventListener('click', toggleTheme);

            // Photo Upload
            document.getElementById('photoUpload').addEventListener('change', handlePhotoUpload);

            // Edit Profile
            document.getElementById('editProfileBtn').addEventListener('click', () => {
                document.getElementById('editModal').classList.add('active');
            });
            document.getElementById('saveEdit').addEventListener('click', saveProfile);
            document.getElementById('cancelEdit').addEventListener('click', () => {
                document.getElementById('editModal').classList.remove('active');
            });

            // Notification Toggle
            document.getElementById('notificationToggle').addEventListener('click', toggleNotifications);

            // Biometric Toggle
            document.getElementById('biometricBtn').addEventListener('click', toggleBiometric);

            // Download Data
            document.getElementById('downloadBtn').addEventListener('click', downloadData);

            // Delete Account
            document.getElementById('deleteBtn').addEventListener('click', () => {
                document.getElementById('deleteModal').classList.add('active');
            });
            document.getElementById('confirmDelete').addEventListener('click', deleteAccount);
            document.getElementById('cancelDelete').addEventListener('click', () => {
                document.getElementById('deleteModal').classList.remove('active');
            });

            // Feedback
            document.getElementById('feedbackBtn').addEventListener('click', () => {
                document.getElementById('feedbackModal').classList.add('active');
            });
            document.getElementById('submitFeedback').addEventListener('click', submitFeedback);
            document.getElementById('cancelFeedback').addEventListener('click', () => {
                document.getElementById('feedbackModal').classList.remove('active');
            });

            // Navigation
            document.querySelectorAll('.nav-item').forEach(item => {
                item.addEventListener('click', function() {
                    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                    this.classList.add('active');
                    showNotification('Navigated to ' + this.dataset.nav.charAt(0).toUpperCase() + this.dataset.nav.slice(1));
                });
            });

            // Modal Close on Outside Click
            document.querySelectorAll('.modal').forEach(modal => {
                modal.addEventListener('click', function(e) {
                    if (e.target === this) {
                        this.classList.remove('active');
                    }
                });
            });
        }

        // Toggle Theme
        function toggleTheme() {
            darkMode = !darkMode;
            document.body.classList.toggle('dark', darkMode);
            document.body.classList.toggle('light', !darkMode);
            
            const sunIcon = document.getElementById('sunIcon');
            const moonIcon = document.getElementById('moonIcon');
            
            if (darkMode) {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            } else {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            }
            showNotification('Theme changed to ' + (darkMode ? 'Dark' : 'Light') + ' mode');
        }

        // Handle Photo Upload
        function handlePhotoUpload(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    userData.photo = event.target.result;
                    const photoDiv = document.getElementById('profilePhoto');
                    photoDiv.innerHTML = '<img src="' + event.target.result + '" alt="Profile" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">';
                    showNotification('Profile photo updated!');
                };
                reader.readAsDataURL(file);
            }
        }

        // Save Profile
        function saveProfile() {
            userData.name = document.getElementById('editName').value;
            userData.age = document.getElementById('editAge').value;
            userData.gender = document.getElementById('editGender').value;
            
            document.getElementById('userName').textContent = userData.name + ', ' + userData.age;
            document.getElementById('userGender').textContent = userData.gender;
            
            document.getElementById('editModal').classList.remove('active');
            showNotification('Profile updated successfully!');
        }

        // Toggle Notifications
        function toggleNotifications() {
            notifications = !notifications;
            const btn = document.getElementById('notificationToggle');
            
            if (notifications) {
                btn.classList.add('active');
                btn.innerHTML = '<svg class="icon-sm" fill="none" stroke="#fff" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>';
                showNotification('Notifications enabled');
            } else {
                btn.classList.remove('active');
                btn.innerHTML = '<svg class="icon-sm" fill="none" stroke="#4dd0e1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 8l-6 6m0 0l-6-6"></path></svg>';
                showNotification('Notifications disabled');
            }
        }

        // Toggle Biometric
        function toggleBiometric() {
            biometric = !biometric;
            const btn = document.getElementById('biometricBtn');
            
            if (biometric) {
                btn.classList.add('active');
                btn.style.color = '#fff';
                btn.innerHTML = '<svg class="icon-sm" fill="none" stroke="#fff" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg> Biometric Login';
                showNotification('Biometric login enabled');
            } else {
                btn.classList.remove('active');
                btn.style.color = '#4dd0e1';
                btn.innerHTML = '<svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg> Biometric Login';
                showNotification('Biometric login disabled');
            }
        }

        // Download Data
        function downloadData() {
            const data = {
                user: userData,
                healthScore: healthScore,
                vitals: {
                    bp: '120/80',
                    sugar: 95,
                    bmi: 22.5
                },
                goals: {
                    water: 65,
                    steps: 80
                },
                lastCheckup: '3 days ago',
                preferences: {
                    language: document.getElementById('languageSelect').value,
                    notifications: notifications,
                    biometric: biometric,
                    darkMode: darkMode
                },
                doctor: {
                    name: 'Dr. Rajesh Kumar',
                    specialty: 'General Physician'
                },
                emergencyContact: {
                    name: 'Rajesh Gupta',
                    relation: 'Father',
                    phone: '+91 98765 43210'
                }
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'healthcheck-data-' + new Date().toISOString().split('T')[0] + '.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showNotification('Data downloaded successfully!');
        }

        // Delete Account
        function deleteAccount() {
            document.getElementById('deleteModal').classList.remove('active');
            showNotification('Account deletion initiated. You will receive a confirmation email.', 'warning');
        }

        // Submit Feedback
        function submitFeedback() {
            const feedback = document.getElementById('feedbackText').value;
            if (feedback.trim()) {
                document.getElementById('feedbackModal').classList.remove('active');
                document.getElementById('feedbackText').value = '';
                showNotification('Thank you for your feedback!');
            } else {
                showNotification('Please enter your feedback', 'warning');
            }
        }

        // Show Notification
        function showNotification(message, type) {
            type = type || 'success';
            const notification = document.createElement('div');
            notification.style.cssText = 'position: fixed; top: 80px; right: 20px; background: ' + (type === 'success' ? '#10b981' : '#ef4444') + '; color: white; padding: 1rem 1.5rem; border-radius: 0.5rem; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); z-index: 1000; animation: slideIn 0.3s ease;';
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(function() {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(function() {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }