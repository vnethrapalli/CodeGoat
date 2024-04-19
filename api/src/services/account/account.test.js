// Import necessary modules and functions
import axios from 'axios';
import { updateUsername, deleteAccount } from './account'; // Replace 'yourFile' with the actual file name

// Mock Axios to prevent actual HTTP requests during tests
jest.mock('axios');

describe('updateUsername function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update the username successfully', async () => {
    const user_id = 'user123';
    const nickname = 'newUsername';
    const token = 'fakeToken';

    const tokenResponse = {
      data: {
        access_token: 'fakeAccessToken'
      }
    };

    const updateUserResponse = {
      data: {
        updatedUser: {
          id: 'user123',
          nickname: 'newUsername'
        }
      }
    };

    axios.request
      .mockResolvedValueOnce(tokenResponse)
      .mockResolvedValueOnce(updateUserResponse);

    const result = await updateUsername({ user_id, nickname, token });

    expect(axios.request).toHaveBeenCalledTimes(2);
    expect(result).toEqual(JSON.stringify({ statusCode: 200, message: "Username updated successfully" }));
  });

  it('should handle errors during username update', async () => {
    const user_id = 'user123';
    const nickname = 'newUsername';
    const token = 'fakeToken';

    const error = new Error('Failed to update user');

    axios.request.mockRejectedValueOnce(error);

    const result = await updateUsername({ user_id, nickname, token });

    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(result).toEqual(JSON.stringify({ statusCode: 500, message: "Failed to update username" }));
  });
});

describe('deleteAccount function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete the account successfully', async () => {
    const user_id = 'user123';
    const token = 'fakeToken';

    const tokenResponse = {
      data: {
        access_token: 'fakeAccessToken'
      }
    };

    const deleteUserResponse = {
      status: 204
    };

    axios.request
      .mockResolvedValueOnce(tokenResponse)
      .mockResolvedValueOnce(deleteUserResponse);

    const result = await deleteAccount({ user_id, token });

    expect(axios.request).toHaveBeenCalledTimes(2);
    expect(result).toEqual(JSON.stringify({ statusCode: 204, message: "User successfully deleted" }));
  });

  it('should handle errors during account deletion', async () => {
    const user_id = 'user123';
    const token = 'fakeToken';

    const error = new Error('Failed to delete user');

    axios.request.mockRejectedValueOnce(error);

    const result = await deleteAccount({ user_id, token });

    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(result).toEqual(JSON.stringify({ statusCode: 500, message: "Failed to delete account" }));
  });
});
