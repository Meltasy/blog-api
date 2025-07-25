import styled from 'styled-components'

const StyledItem = styled.li`
  width: 40rem;
  padding: 1rem;
  color: var(--background-color);
  background-color: var(--primary-color);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const ButtonsWrapper = styled.div`
  display: flex;
  margin: 1rem 0;
  gap: 1rem;
  justify-content: flex-end;
`

function BlogPost({ post, onSelect, deleteBlogPost, isLoading }) {
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
    <StyledItem>
      <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p>{post.author.username}</p>
      </div>
      <DateWrapper>
        <p>{formatDate(post.createdAt)}</p>
      </DateWrapper>
      <div>
        <Published>{isPublished}</Published>
      </div>
      <ButtonsWrapper>
        <button className='button' onClick={onSelect}>
          Edit
        </button>
        <button className='button' onClick={deleteBlogPost} disabled={isLoading}>
          {isLoading ? 'Deleting...' : 'Delete'}
        </button>
      </ButtonsWrapper>
    </StyledItem>
  )
}

export default BlogPost
