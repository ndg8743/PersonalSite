//idk if i need this later but here is Bob again
// turns out i needed this, anyway Bob lives on
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
    console.log(`Loading comments for project ID: ${projectId}`);
    const response = await fetch(`/comment/${projectId}`);
    if (!response.ok) throw new Error('Failed to fetch comments.');

    const comments = await response.json();
    const commentsContainer = document.getElementById('comments-list');

    // Clear existing comments
    commentsContainer.innerHTML = '';

    // Render each comment
    comments.forEach(comment => {
      const commentItem = document.createElement('li');
      commentItem.className = 'comment-item';
      commentItem.innerHTML = `
        <p>${comment.content}</p>
        <small>By User ID: ${comment.user_id}</small>
        <button onclick="likeComment(${comment.comment_id}, ${projectId})">Like (${comment.num_likes})</button>
      `;
      commentsContainer.appendChild(commentItem);
    });
    console.log("Comments loaded successfully");
  } catch (error) {
    console.error('Error loading comments:', error);
  }
}

// Submit a new comment
document.getElementById('comment-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const commentText = document.getElementById('comment-text').value;
    const projectId = document.getElementById('project-id').value;
    console.log(`Submitting comment for project ID: ${projectId}`);

    const response = await fetch('/comment/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId, content: commentText })
    });

    if (!response.ok) throw new Error('Failed to submit comment.');

    document.getElementById('comment-text').value = ''; // Clear comment box
    loadComments(projectId); // Refresh comments
    console.log("Comment submitted successfully");
  } catch (error) {
    console.error('Error submitting comment:', error);
  }
});

// Like a comment
async function likeComment(commentId, projectId) {
  try {
    console.log(`Liking comment ID: ${commentId} for project ID: ${projectId}`);
    const response = await fetch(`/comment/like/${commentId}`, { method: 'POST' });
    if (!response.ok) throw new Error('Failed to like comment.');

    loadComments(projectId); // Refresh comments
    console.log("Comment liked successfully");
  } catch (error) {
    console.error('Error liking comment:', error);
  }
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  const projectId = document.getElementById('project-id').value;
  console.log(`Initial load for project ID: ${projectId}`);
  loadComments(projectId);
});// Fetch and display comments for the project
async function loadComments(projectId) {
  try {
    console.log(`Loading comments for project ID: ${projectId}`);
    const response = await fetch(`/comment/${projectId}`);
    if (!response.ok) throw new Error('Failed to fetch comments.');

    const comments = await response.json();
    const commentsContainer = document.getElementById('comments-list');

    // Clear existing comments
    commentsContainer.innerHTML = '';

    // Render each comment
    comments.forEach(comment => {
      const commentItem = document.createElement('li');
      commentItem.className = 'comment-item';
      commentItem.innerHTML = `
        <p>${comment.content}</p>
        <small>By User ID: ${comment.user_id}</small>
        <button onclick="likeComment(${comment.comment_id}, ${projectId})">Like (${comment.num_likes})</button>
      `;
      commentsContainer.appendChild(commentItem);
    });
    console.log("Comments loaded successfully");
  } catch (error) {
    console.error('Error loading comments:', error);
  }
}

// Submit a new comment
document.getElementById('comment-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const commentText = document.getElementById('comment-text').value;
    const projectId = document.getElementById('project-id').value;
    console.log(`Submitting comment for project ID: ${projectId}`);

    const response = await fetch('/comment/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId, content: commentText })
    });

    if (!response.ok) throw new Error('Failed to submit comment.');

    document.getElementById('comment-text').value = ''; // Clear comment box
    loadComments(projectId); // Refresh comments
    console.log("Comment submitted successfully");
  } catch (error) {
    console.error('Error submitting comment:', error);
  }
});

// Like a comment
async function likeComment(commentId, projectId) {
  try {
    console.log(`Liking comment ID: ${commentId} for project ID: ${projectId}`);
    const response = await fetch(`/comment/like/${commentId}`, { method: 'POST' });
    if (!response.ok) throw new Error('Failed to like comment.');

    loadComments(projectId); // Refresh comments
    console.log("Comment liked successfully");
  } catch (error) {
    console.error('Error liking comment:', error);
  }
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  const projectId = document.getElementById('project-id').value;
  console.log(`Initial load for project ID: ${projectId}`);
  loadComments(projectId);
});