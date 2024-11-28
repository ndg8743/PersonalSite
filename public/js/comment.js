async function loadComments(projectId) {
  try {
      const response = await fetch(`/comment/${projectId}`);
      if (!response.ok) throw new Error("Failed to fetch comments");

      const comments = await response.json();
      const commentsContainer = document.getElementById("modal-comments");
      commentsContainer.innerHTML = ""; // Clear existing comments

      comments.forEach((comment) => {
          const commentItem = document.createElement("li");
          commentItem.innerHTML = `
              <p>${comment.content}</p>
              <small>By User ID: ${comment.user_id}</small>
              <button onclick="likeComment(${comment.comment_id}, ${projectId})">Like (${comment.num_likes})</button>
          `;
          commentsContainer.appendChild(commentItem);
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
      });
      if (!response.ok) throw new Error("Failed to submit comment");

      document.getElementById("modal-comment").value = ""; // Clear input
      loadComments(projectId); // Reload comments
  } catch (error) {
      console.error("Error submitting comment:", error);
  }
}

async function likeComment(commentId, projectId) {
  try {
      const response = await fetch(`/comment/like/${commentId}`, { method: "POST" });
      if (!response.ok) throw new Error("Failed to like comment");

      loadComments(projectId); // Refresh comments
  } catch (error) {
      console.error("Error liking comment:", error);
  }
}
