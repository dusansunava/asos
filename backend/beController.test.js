import request from 'supertest';
import express from 'express';
import foodRoutes from '@/routes/foodRoutes'; // Adjust to your actual route file
import verifyJWT from '@/middleware/verifyJWT';

// Mock the controllers to avoid testing the actual database or external API calls
jest.mock('@/controllers/food/controller', () => ({
  getSimilarFoods: jest.fn(),
  getUserFoods: jest.fn(),
  getSuggestionRequest: jest.fn(),
  getFoodInfoRequest: jest.fn(),
  postUserFood: jest.fn(),
  deleteFoodLog: jest.fn(),
}));

jest.mock('@/middleware/verifyJWT', () => jest.fn((req, res, next) => next()));

describe('Food Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json()); // To parse JSON request bodies
    foodRoutes(app); // Register the routes
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock function calls after each test
  });

  describe('GET /food', () => {
    it('should get user foods', async () => {
      const mockUserFoods = [{ id: 1, name: 'Apple' }];
      const { getUserFoods } = require('@/controllers/food/controller');
      getUserFoods.mockResolvedValue(mockUserFoods); // Mock successful response

      const response = await request(app).get('/food').set('Authorization', 'Bearer token');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUserFoods);
      expect(getUserFoods).toHaveBeenCalledTimes(1);
    });

    it('should return 401 if no token provided', async () => {
      const response = await request(app).get('/food');

      expect(response.status).toBe(401); // Unauthorized error
    });
  });

  describe('POST /food', () => {
    it('should post a new food', async () => {
      const mockFood = { id: 1, name: 'Banana' };
      const { postUserFood } = require('@/controllers/food/controller');
      postUserFood.mockResolvedValue(mockFood); // Mock successful response

      const response = await request(app)
        .post('/food')
        .set('Authorization', 'Bearer token')
        .send({ name: 'Banana' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockFood);
      expect(postUserFood).toHaveBeenCalledTimes(1);
    });

    it('should return 400 if food data is invalid', async () => {
      const response = await request(app)
        .post('/food')
        .set('Authorization', 'Bearer token')
        .send({}); // Send invalid data

      expect(response.status).toBe(400); // Bad request error
    });
  });

  describe('DELETE /food/:id', () => {
    it('should delete a food log', async () => {
      const { deleteFoodLog } = require('@/controllers/food/controller');
      deleteFoodLog.mockResolvedValue({ message: 'Food log deleted' });

      const response = await request(app)
        .delete('/food/1')
        .set('Authorization', 'Bearer token');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Food log deleted');
      expect(deleteFoodLog).toHaveBeenCalledWith(expect.objectContaining({ params: { id: '1' } }));
    });

    it('should return 404 if food log not found', async () => {
      const { deleteFoodLog } = require('@/controllers/food/controller');
      deleteFoodLog.mockRejectedValue(new Error('Not found'));

      const response = await request(app)
        .delete('/food/999')
        .set('Authorization', 'Bearer token');

      expect(response.status).toBe(404); // Not Found error
    });
  });

  describe('POST /food/similar', () => {
    it('should get similar foods', async () => {
      const mockSimilarFoods = [{ id: 1, name: 'Apple' }];
      const { getSimilarFoods } = require('@/controllers/food/controller');
      getSimilarFoods.mockResolvedValue(mockSimilarFoods);

      const response = await request(app)
        .post('/food/similar')
        .set('Authorization', 'Bearer token')
        .send({ name: 'Apple' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSimilarFoods);
    });
  });

  describe('POST /spoonacular/foodSuggestion', () => {
    it('should get food suggestions', async () => {
      const mockSuggestions = [{ id: 1, name: 'Pizza' }];
      const { getSuggestionRequest } = require('@/controllers/food/controller');
      getSuggestionRequest.mockResolvedValue(mockSuggestions);

      const response = await request(app)
        .post('/spoonacular/foodSuggestion')
        .set('Authorization', 'Bearer token')
        .send({ ingredients: ['cheese', 'tomato'] });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSuggestions);
    });
  });

  describe('POST /spoonacular/foodInfo', () => {
    it('should get food info', async () => {
      const mockFoodInfo = { id: 1, name: 'Pasta', calories: 300 };
      const { getFoodInfoRequest } = require('@/controllers/food/controller');
      getFoodInfoRequest.mockResolvedValue(mockFoodInfo);

      const response = await request(app)
        .post('/spoonacular/foodInfo')
        .set('Authorization', 'Bearer token')
        .send({ foodId: 123 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockFoodInfo);
    });
  });
});
