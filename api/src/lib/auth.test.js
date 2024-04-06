import { isAuthenticated, getCurrentUser } from "./auth";

const mockGlobalContext = {
  // Define properties and methods you want to simulate
  // For example, you can mimic the behavior of global.context
  context: {
    // Define your context properties and methods
    currentUser: null
  },
};

// Before running your tests, set the global context to your mock
beforeAll(() => {
  global.context = mockGlobalContext.context;
});

// After running your tests, clean up the global context
afterAll(() => {
  delete global.context;
});

describe("auth", () => {
  it('Not Authenticated', () => {
    context.currentUser = null

    expect(isAuthenticated()).toBe(false)
  })
  it('Expired Token', () => {
    context.currentUser = {
      "sub": "1234567890",
      "name": "John Doe",
      "iat": 1516239022,
      "exp": 1616239022 // Expiration time is in the past
    }

    expect(isAuthenticated()).toBe(false)
  })
  it('Authenticated', () => {
    context.currentUser = {
      "sub": "1234567890",
      "name": "John Doe",
      "iat": 1516239022,
      "exp": Math.floor(new Date().getTime() / 1000) + 86400  // Expiration time is 1 day from now
    }
    expect(isAuthenticated()).toBe(true)
  })
})
