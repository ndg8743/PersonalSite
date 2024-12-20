let currentProjectId = null;
let currentUserId = null;

async function loadComments(projectId) {
    currentProjectId = projectId;
    try {
        // Get current user's ID
        const userResponse = await fetch('/user/check-login');
        const userData = await userResponse.json();
        currentUserId = userData.userId;
        const isLoggedIn = userData.isLoggedIn;

        // Fetch comments
        const response = await fetch(`/comment/${projectId}`);
        if (!response.ok) throw new Error("Failed to fetch comments");

        const comments = await response.json();
        const commentsContainer = document.getElementById("modal-comments");
        commentsContainer.innerHTML = '<ul></ul>';
        const commentsList = commentsContainer.querySelector('ul');

        // Show/hide comment form based on login status
        const commentForm = document.getElementById('modal-comment-form');
        if (isLoggedIn) {
            commentForm.style.display = 'block';
            if (document.querySelector('.login-message')) {
                document.querySelector('.login-message').remove();
            }
        } else {
            commentForm.style.display = 'none';
            const loginMessage = document.createElement('p');
            loginMessage.textContent = 'Please log in to comment';
            loginMessage.style.color = '#666';
            loginMessage.classList.add('login-message');
            commentsContainer.insertBefore(loginMessage, commentsList);
        }

        comments.forEach((comment) => {
            const commentItem = document.createElement("li");
            commentItem.dataset.commentId = comment.comment_id;
            
            const isCommentOwner = currentUserId === comment.user_id;
            const editDeleteButtons = isCommentOwner ? `
                <button onclick="editComment(${comment.comment_id})" class="edit-btn">Edit</button>
                <button onclick="deleteComment(${comment.comment_id})" class="delete-btn">Delete</button>
            ` : '';

            commentItem.innerHTML = `
                <div class="comment-content">
                    <p>${comment.content}</p>
                    <small>
                        By ${comment.username} on ${comment.formatted_date_created}
                        ${comment.date_modified !== comment.date_created ? 
                          `(edited on ${comment.formatted_date_modified})` : ''}
                    </small>
                    <div class="comment-actions">
                        <button onclick="likeComment(${comment.comment_id}, ${projectId})" class="like-btn">
                            Like (${comment.num_likes})
                        </button>
                        ${editDeleteButtons}
                    </div>
                </div>
            `;
            commentsList.appendChild(commentItem);
        });
    } catch (error) {
        console.error("Error loading comments:", error);
    }
}

async function submitComment(projectId, content) {
    try {
        const response = await fetch("/comment/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ projectId, content }),
            credentials: 'include'
        });

        if (!response.ok) {
            if (response.status === 401) {
                alert('Please log in to comment');
                return;
            }
            throw new Error("Failed to submit comment");
        }

        document.getElementById("modal-comment").value = "";
        await loadComments(projectId);
    } catch (error) {
        console.error("Error submitting comment:", error);
        alert('Error submitting comment. Please try again.');
    }
}

async function editComment(commentId) {
    const commentItem = document.querySelector(`li[data-comment-id="${commentId}"]`);
    const commentContent = commentItem.querySelector('p').textContent;
    
    // Replace comment content with edit form
    commentItem.innerHTML = `
        <div class="edit-form">
            <textarea class="edit-textarea">${commentContent}</textarea>
            <div class="edit-actions">
                <button onclick="saveEdit(${commentId})" class="save-btn">Save</button>
                <button onclick="cancelEdit(${commentId})" class="cancel-btn">Cancel</button>
            </div>
        </div>
    `;
}

async function saveEdit(commentId) {
    const commentItem = document.querySelector(`li[data-comment-id="${commentId}"]`);
    const newContent = commentItem.querySelector('.edit-textarea').value;

    try {
        const response = await fetch(`/comment/${commentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: newContent }),
            credentials: 'include'
        });

        if (!response.ok) {
            if (response.status === 401) {
                alert('Please log in to edit comments');
                return;
            }
            throw new Error("Failed to update comment");
        }

        await loadComments(currentProjectId);
    } catch (error) {
        console.error("Error updating comment:", error);
        alert('Error updating comment. Please try again.');
    }
}

async function cancelEdit(commentId) {
    await loadComments(currentProjectId);
}

async function deleteComment(commentId) {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
        const response = await fetch(`/comment/${commentId}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (!response.ok) {
            if (response.status === 401) {
                alert('Please log in to delete comments');
                return;
            }
            throw new Error("Failed to delete comment");
        }

        await loadComments(currentProjectId);
    } catch (error) {
        console.error("Error deleting comment:", error);
        alert('Error deleting comment. Please try again.');
    }
}

async function likeComment(commentId, projectId) {
    try {
        const response = await fetch(`/comment/like/${commentId}`, {
            method: "POST",
            credentials: 'include'
        });

        if (!response.ok) {
            if (response.status === 401) {
                alert('Please log in to like comments');
                return;
            }
            throw new Error("Failed to like comment");
        }

        await loadComments(projectId);
    } catch (error) {
        console.error("Error liking comment:", error);
        alert('Error liking comment. Please try again.');
    }
}

// Add event listener for comment form submission
document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('modal-comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const commentContent = document.getElementById('modal-comment').value;
            if (currentProjectId && commentContent.trim()) {
                await submitComment(currentProjectId, commentContent);
            }
        });
    }
});
