//idk if i need this later but here is Bob again
/*

    Bob   /\
        _/./
     ,-'    `-:..-'/
    : o )      _  (
    "`-....,--; `-.
        `'


*/
// Fetch and display comments for the project
async function loadComments(projectId) {
    try {
        const response = await fetch(`/comments?projectId=${projectId}`);
        if (!response.ok) throw new Error('Failed to fetch comments.');

        const comments = await response.json();
        const commentsContainer = document.getElementById('comments-container');

        // Clear existing comments
        commentsContainer.innerHTML = '';

        // Render each comment
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';

            commentDiv.innerHTML = `
                <p>${comment.content}</p>
                <small>By User ID: ${comment.user_id}</small>
                <button onclick="likeComment(${comment.comment_id}, ${projectId})">Like (${comment.likes})</button>
            `;

            commentsContainer.appendChild(commentDiv);
        });
    } catch (error) {
        console.error('Error loading comments:', error);
    }
}

// Submit a new comment
document.getElementById('comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const comment = document.getElementById('comment').value;
        const projectId = document.getElementById('project-id').value; // Dynamic project ID

        const response = await fetch('/comments/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projectId, content: comment })
        });

        if (!response.ok) throw new Error('Failed to submit comment.');

        document.getElementById('comment').value = ''; // Clear comment box
        loadComments(projectId); // Refresh comments
    } catch (error) {
        console.error('Error submitting comment:', error);
    }
});

// Like a comment
async function likeComment(commentId, projectId) {
    try {
        const response = await fetch(`/comments/like/${commentId}`, { method: 'POST' });
        if (!response.ok) throw new Error('Failed to like comment.');

        loadComments(projectId); // Refresh comments
    } catch (error) {
        console.error('Error liking comment:', error);
    }
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    const projectId = document.getElementById('project-id').value; // Dynamic project ID
    loadComments(projectId);
});
