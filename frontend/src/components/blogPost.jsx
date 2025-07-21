import styled from 'styled-components'

const StyledItem = styled.li`
  width: 40rem;
  padding: 1rem;
  color: var(--background-color);
  background-color: var(--primary-color);
  display: flex;
  flex-direction: column;
  align-self: space-between;
`

const ButtonWrapper = styled.div`
  align-self: flex-end;
`

const CommentCount = styled.p`
  font-style: italic;
  color: var(--secondary-color);
`

function BlogPost({ post, onSelect }) {
  const commentCount = post.comments ? post.comments.length : 0

  return (
    <StyledItem key={post.id}>
      <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
      <div>
        <CommentCount>
          {commentCount === 0 ? 'No comments' : commentCount === 1 ? '1 comment' : `${commentCount} comments`}
        </CommentCount>
      </div>
      <ButtonWrapper>
        <button className='button' onClick={onSelect}>
          Read More
        </button>
      </ButtonWrapper>
    </StyledItem>
  )
}

export default BlogPost
