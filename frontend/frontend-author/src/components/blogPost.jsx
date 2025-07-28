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

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const Author = styled.p`
  font-weight: 700;
`

const DateText = styled.p`
  font-size: 0.8rem;
  font-style: italic;
  font-weight: 700;
`

const ButtonsWrapper = styled.div`
  display: flex;
  margin: 1rem 0;
  gap: 1rem;
  justify-content: flex-end;
`

function BlogPost({ post, onSelect, togglePublish, deleteBlogPost, isPublishLoading, isLoading }) {

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
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </div>
      <InfoWrapper>
        <div>
          <Author>{post.author.username}</Author>
          <DateText>{formatDate(post.createdAt)}</DateText>
        </div>
        <ButtonsWrapper>
          <button className='button' onClick={togglePublish} disabled={isPublishLoading}>
            {isPublishLoading
              ? (post.published ? 'Unpublishing...' : 'Pulishing...')
              : (post.published ? 'Unpublish' : 'Publish')
            }
          </button>
          <button className='button' onClick={onSelect}>
            Edit
          </button>
          <button className='button' onClick={deleteBlogPost} disabled={isLoading}>
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </ButtonsWrapper>
      </InfoWrapper>
    </StyledItem>
  )
}

export default BlogPost
