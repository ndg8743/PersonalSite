async function loadComments(projectId) {
    const commentsContainer = document.getElementById("modal-comments");
    commentsContainer.innerHTML = '<li class="loading">Loading comments...</li>';
    
    try {
        const comments = await window.fetchData(`/comment/${projectId}`, {}, 'GET');
        commentsContainer.innerHTML = ""; // Clear loading message

        if (comments.length === 0) {
            commentsContainer.innerHTML = '<li class="no-comments">No comments yet. Be the first to comment!</li>';
            return;
        }

        comments.forEach((comment) => {
            const commentItem = document.createElement("li");
            const date = new Date(comment.date_created).toLocaleDateString();
            
            commentItem.innerHTML = `
                <div class="comment-content">
                    <p>${escapeHtml(comment.content)}</p>
                    <div class="comment-meta">
                        <small>Posted by ${comment.username || 'User ' + comment.user_id} on ${date}</small>
                        <button onclick="likeComment(${comment.comment_id}, ${projectId})" class="like-button">
                            <span class="like-count">${comment.num_likes || 0}</span>
                            <span class="like-text">Like${comment.num_likes !== 1 ? 's' : ''}</span>
                        </button>
                    </div>
                </div>
            `;
            commentsContainer.appendChild(commentItem);
        });
    } catch (error) {
        console.error("Error loading comments:", error.message);
        commentsContainer.innerHTML = `
            <li class="error">
                Failed to load comments. 
                <button onclick="loadComments(${projectId})" class="retry-button">Try Again</button>
            </li>
        `;
    }
}

async function submitComment(projectId, content) {
    if (!content.trim()) {
        showError('comment', 'Comment cannot be empty');
        return;
    }

    const submitButton = document.querySelector('#modal-comment-form button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Posting...';
    submitButton.disabled = true;

    try {
        await window.fetchData("/comment/create", { projectId, content }, 'POST');
        document.getElementById("modal-comment").value = ""; // Clear input
        await loadComments(projectId); // Reload comments
    } catch (error) {
        console.error("Error submitting comment:", error.message);
        showError('comment', error.message);
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

async function likeComment(commentId, projectId) {
    try {
        await window.fetchData(`/comment/like/${commentId}`, {}, 'POST');
        await loadComments(projectId); // Refresh comments
    } catch (error) {
        console.error("Error liking comment:", error.message);
        showError('comment', error.message);
    }
}

function showError(type, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    if (type === 'comment') {
        const form = document.getElementById('modal-comment-form');
        form.insertBefore(errorDiv, form.firstChild);
    } else {
        const commentsSection = document.querySelector('.comments-section');
        commentsSection.insertBefore(errorDiv, commentsSection.firstChild);
    }
    
    errorDiv.style.display = 'block';
    setTimeout(() => errorDiv.remove(), 5000);
}

// Helper function to escape HTML and prevent XSS
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Add CSS for new elements
const style = document.createElement('style');
style.textContent = `
    .loading, .no-comments {
        text-align: center;
        color: #666;
        padding: 20px;
    }

    .comment-content {
        margin-bottom: 10px;
    }

    .comment-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 5px;
    }

    .like-button {
        background: none;
        border: none;
        color: #04ff00;
        cursor: pointer;
        padding: 5px 10px;
        font-size: 0.9em;
        transition: all 0.3s ease;
    }

    .like-button:hover {
        color: white;
    }

    .retry-button {
        background: #04ff00;
        color: black;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
        margin-left: 10px;
        cursor: pointer;
    }

    .retry-button:hover {
        background: #03cc00;
    }
`;
document.head.appendChild(style);
