const r = require('../testutils/resources');

describe('Vezgo Providers resource', () => {
  r.setup.bind(this)();

  test('should be initiated along with the Vezgo instance', () => {
    expect(this.vezgo.providers).toBeDefined();
    expect(this.vezgo.providers).toHaveProperty('getList');
    expect(this.vezgo.providers).toHaveProperty('getOne');
  });

  describe('.getList()', () => {
    test('should GET /providers', async () => {
      this.apiMock.onGet().reply(200, [{ test: 'data' }]);
      const providers = await this.vezgo.providers.getList();
      expect(providers).toEqual(expect.arrayContaining([{ test: 'data' }]));
      expect(this.apiMock.history.get[0].url).toBe('/providers');
    });

    r.shouldHandleApiError.bind(this)(
      () => this.apiMock.onGet('/providers'),
      () => this.vezgo.providers.getList(),
    );
  });

  describe('.getOne(id)', () => {
    test('should GET /providers/:id', async () => {
      this.apiMock.onGet().reply(200, { test: 'data' });
      const provider = await this.vezgo.providers.getOne('test');
      expect(provider).toEqual({ test: 'data' });
      expect(this.apiMock.history.get[0].url).toBe('/providers/test');
    });

    r.shouldValidateId.bind(this)('provider id', false, [
      () => this.vezgo.providers.getOne(),
      () => this.vezgo.providers.getOne(1),
    ]);

    r.shouldHandleApiError.bind(this)(
      () => this.apiMock.onGet('/providers/test'),
      () => this.vezgo.providers.getOne('test'),
    );
  });
});
