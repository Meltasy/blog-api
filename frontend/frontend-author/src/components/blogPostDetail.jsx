import styled from 'styled-components'

const Wrapper = styled.div`
  color: var(--background-color);
  background-color: var(--primary-color);
  max-width: 60rem;
  padding: 2rem;
  margin: 0 auto;
  border-radius: 1rem;
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

function BlogPostDetail({ post, onReturn }) {
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
    <Wrapper>
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
        <button className='button' onClick={onReturn}>
          Return to Blog posts
        </button>
      </ButtonWrapper>
    </Wrapper>
  )
}

export default BlogPostDetail