const { handler } = require('./index')

global.fetch = jest.fn()
    .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({})
    }))

const mockRequest = {
    userName: "Test User",
    request: {
        userAttributes: {
            email: "test@example.com",
            sub: "12345",
            phone_number: "+123456789",
            'custom:marketing_consent': 'true'
        }
    }
}

describe("handler function", () => {
    it("should process the request correctly", async () => {

        await handler(mockRequest, {}, (err, res) => {

            expect(res).toEqual(mockRequest)
            return
        })
    })
})