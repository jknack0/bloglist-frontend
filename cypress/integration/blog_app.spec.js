describe('Blog app', function() {
  beforeEach(function() {
    const user = {
      username: 'test',
      password: 'test',
      name: 'test'
    }
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Front page can be opened', function() {
    cy.contains('log in to application')
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with valid credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#submit-button').click()
      cy.contains('test logged in')
    })

    it('fails with invalid credentials', function() {
      cy.get('#username').type('fail')
      cy.get('#password').type('fail')
      cy.get('#submit-button').click()
      cy.contains('invalid username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test', password: 'test' })
    })

    it('a blog can be created', function() {
      cy.contains('add blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#submit-button').click()

      cy.contains('test title test author')
    })

    describe('and there is a blog', function() {
      beforeEach(function() {
        cy.contains('add blog').click()
        cy.get('#title').type('test title')
        cy.get('#author').type('test author')
        cy.get('#url').type('test url')
        cy.get('#submit-button').click()
      })

      it('a blog can can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes: 1')
      })

      it('a blog can be deleted', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.contains('removed from the list')
      })
    })
  })
})