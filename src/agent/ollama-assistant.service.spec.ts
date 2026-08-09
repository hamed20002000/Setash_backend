import axios from 'axios';
import { OllamaAssistantService } from './ollama-assistant.service';

jest.mock('axios');

describe('OllamaAssistantService', () => {
  it('uses the database schema when generating SQL', async () => {
    const query = jest.fn()
      .mockResolvedValueOnce([{ table_name: 'categories' }])
      .mockResolvedValueOnce([
        { column_name: 'id', data_type: 'integer', is_nullable: 'NO', column_default: null },
        { column_name: 'name', data_type: 'character varying', is_nullable: 'NO', column_default: null },
      ])
      .mockResolvedValue([{ id: 1, name: 'Test' }]);

    const dataSource = {
      query,
    } as any;

    jest.mocked(axios.post).mockResolvedValue({
      data: {
        message: {
          content: 'SELECT * FROM categories',
        },
      },
    } as any);

    const service = new OllamaAssistantService(dataSource);
    const result = await service.handleUserRequest({ text: 'list categories' });

    expect(result.sql).toBe('SELECT * FROM categories');
    expect(result.result).toEqual([{ id: 1, name: 'Test' }]);

    const requestPayload = jest.mocked(axios.post).mock.calls[0][1];
    expect(requestPayload.messages[0].content).toContain('categories');
    expect(requestPayload.messages[0].content).toContain('name');
  });
});
