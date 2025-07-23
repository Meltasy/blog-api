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

const DateWrapper = styled.div`
  font-size: 0.8rem;
  font-style: italic;
  font-weight: bold;
`

const Published = styled.p`
  font-style: italic;
  font-weight: bold;
  color: var(--secondary-color);
`

const ButtonWrapper = styled.div`
  align-self: flex-end;
`

function BlogPost({ post, onSelect, deletePost }) {
  const isPublished = post.published ? 'Published' : 'Not yet published'

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-fr', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <StyledItem key={post.id}>
      <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p>{post.author}</p>
      </div>
      <DateWrapper>
        <p>{formatDate(post.createdAt)}</p>
      </DateWrapper>
      <div>
        <Published>
          {isPublished}
        </Published>
      </div>
      <ButtonWrapper>
        <button className='button' onClick={onSelect}>
          Edit
        </button>
        <button className='button' onClick={deletePost}>
          Delete
        </button>
      </ButtonWrapper>
    </StyledItem>
  )
}

export default BlogPost
