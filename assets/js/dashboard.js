/**
 * dashboard.js - Dashboard interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Logout Redirect
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        // Clear any auth data if exists
        window.location.href = 'index.html';
    });

    // Sidebar Toggle (Mobile)
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.dashboard-sidebar');
    sidebarToggle?.addEventListener('click', () => {
        sidebar?.classList.toggle('active');
    });

    // Tab Switching Logic
    const sidebarLinks = document.querySelectorAll('.sidebar-link[data-target], .switch-tab-btn[data-target]');
    const tabContents = document.querySelectorAll('.dashboard-tab-content');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('data-target');
            if (targetId) {
                e.preventDefault();
                
                // Hide all tabs
                tabContents.forEach(tab => tab.classList.remove('active'));
                
                // Show target tab
                const targetTab = document.getElementById(targetId);
                if (targetTab) {
                    targetTab.classList.add('active');
                }

                // Update active state in sidebar (only if the link clicked is in sidebar)
                if (link.classList.contains('sidebar-link')) {
                    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                } else {
                    // If it's a button in content, find the corresponding sidebar link
                    document.querySelectorAll('.sidebar-link').forEach(l => {
                        l.classList.remove('active');
                        if (l.getAttribute('data-target') === targetId) {
                            l.classList.add('active');
                        }
                    });
                }

                // Close sidebar on mobile after selection
                if (window.innerWidth < 992) {
                    sidebar?.classList.remove('active');
                }
            }
        });
    });

    // Mock functionality for file upload
    const uploadBtn = document.getElementById('upload-btn');
    uploadBtn?.addEventListener('click', () => {
        alert('Secure file upload gateway would open here.');
    });
});
