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
    const response = await fetch(`/comments?projectId=${projectId}`);
    const comments = await response.json();

    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = '';
    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = `
            <p>${comment.content}</p>
            <small>By User ID: ${comment.user_id}</small>
            <button onclick="likeComment(${comment.comment_id})">Like (${comment.likes})</button>
        `;
        commentsContainer.appendChild(commentDiv);
    });
}

// Submit a new comment
document.getElementById('comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const comment = document.getElementById('comment').value;
    const projectId = 1; // Replace with dynamic project ID

    const response = await fetch('/comments/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ projectId, content: comment })
    });

    if (response.ok) {
        document.getElementById('comment').value = '';
        loadComments(projectId); // Refresh comments
    } else {
        console.error('Failed to submit comment.');
    }
});

// Like a comment
async function likeComment(commentId) {
    const response = await fetch(`/comments/like/${commentId}`, { method: 'POST' });

    if (response.ok) {
        const projectId = 1; // Replace with dynamic project ID
        loadComments(projectId); // Refresh comments
    } else {
        console.error('Failed to like comment.');
    }
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    const projectId = 1; // Replace with dynamic project ID
    loadComments(projectId);
});
