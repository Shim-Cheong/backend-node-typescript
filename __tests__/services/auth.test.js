import AuthService from "../../src/services/auth";

describe("Auth service unit tests", () => {
  describe("Signup", () => {
    test("Should create user record", async () => {
      
      const userModel = {
        create: props => {
          return {
            ...props,
            toObject: props => props
          };
        }
      };

      const userInput = {
        id: "Mock-ID",
        studentId: "20175032",
        name: "Mock User",
        email: "test@gist.ac.kr",
        password: "abcd1234"
      };

      const authService = new AuthService(userModel);
      const userRecord = await authService.SignUp(userInput);

      expect(userRecord).toBeDefined();
      expect(userRecord.token).toBeDefined();
    });
  });
});
