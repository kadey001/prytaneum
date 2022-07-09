import bcrypt from 'bcryptjs';
import { getOrCreateServer } from '@local/core/server';
import { getPrismaClient } from '@local/core/utils';
import { createMercuriusTestClient } from 'mercurius-integration-testing';
import * as plugins from '@local/core/plugins';
import * as jwt from '@local/lib/jwt';
import { toGlobalId } from '../utils';

const server = getOrCreateServer();
const testClient = createMercuriusTestClient(server);
const prisma = getPrismaClient(server.log);

const toUserId = toGlobalId('User');

const userData = {
    id: '4136cd0b-d90b-4af7-b485-5d1ded8db252',
    email: 'sallySmith@test.com',
    firstName: 'Sally',
    lastName: 'Smith',
    password: 'Password1!',
    preferredLang: 'EN',
};

beforeAll(async () => {
    // Attack relevant plugins
    plugins.attachCookieTo(server);
    plugins.attachMercuriusTo(server);

    // hash password as they are never stored in plaintext on the DB
    const encryptedPassword = await bcrypt.hash(userData.password, 10);

    // Add user to test DB
    await prisma.user.create({
        data: {
            ...userData,
            password: encryptedPassword,
        },
    });
});

afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.$disconnect();
    await server.close();
});

describe('account resolvers', () => {
    describe('Query', () => {
        describe('[me]', () => {
            test('[me] query with no cookie should return null', async () => {
                // Arrange
                const query = 'query { me { id } }';

                // Act
                const queryResponse = await testClient.query(query);

                // Assert
                const expectedResponse = { data: { me: null } };
                expect(queryResponse).toEqual(expectedResponse);
            });
            test('[me] query with non-existing account cookie should return null', async () => {
                // Arrange
                const query = 'query { me { id } }';
                const token = await jwt.sign({ id: '' });
                testClient.setCookies({ jwt: token });

                // Act
                const queryResponse = await testClient.query(query);

                // Assert
                const expectedResponse = { data: { me: null } };
                expect(queryResponse).toEqual(expectedResponse);
            });
            test('[me] query with existing account cookie should return user id', async () => {
                // Arrange
                const query = 'query { me { id } }';
                const user = toUserId(userData);
                const token = await jwt.sign({ id: user.id });
                testClient.setCookies({ jwt: token });

                // Act
                const queryResponse = await testClient.query(query);

                // Assert
                const expectedResponse = { data: { me: { id: user.id } } };
                expect(queryResponse).toEqual(expectedResponse);
            });
        });
    });
    describe('User', () => {
        describe('organizations', () => {
            test('should return empty list of edges when user has no organizations', async () => {
                // Arrange
                const query = 'query { me { organizations { edges { node { name } } } } }';
                const user = toUserId(userData);
                const token = await jwt.sign({ id: user.id });
                testClient.setCookies({ jwt: token });

                // Act
                const queryResponse = await testClient.query(query);

                // Assert
                const expectedResponse = { data: { me: { organizations: { edges: [] } } } };
                expect(queryResponse).toEqual(expectedResponse);
            });

            describe('user with organizations', () => {
                beforeAll(async () => {
                    await prisma.organization.create({
                        data: { name: 'testOrg', members: { create: [{ userId: userData.id }] } },
                    });
                });

                afterAll(async () => {
                    await prisma.organization.deleteMany();
                });

                test('should return list of edges with organization node', async () => {
                    // Arrange
                    const query = 'query { me { organizations { edges { node { name } } } } }';
                    const user = toUserId(userData);
                    const token = await jwt.sign({ id: user.id });
                    testClient.setCookies({ jwt: token });

                    // Act
                    const queryResponse = await testClient.query(query);

                    // Assert
                    const expectedResponse = {
                        data: { me: { organizations: { edges: [{ node: { name: 'testOrg' } }] } } },
                    };
                    expect(queryResponse).toEqual(expectedResponse);
                });
            });
        });
    });
    describe('Mutation', () => {
        describe('register', () => {
            test('should fail to register an account with an exisiting email', async () => {
                // Arrange
                const mutation = `mutation{
                        register(input: { email: "${userData.email}", firstName: "New", lastName: "User", password: "Password1!", confirmPassword: "Password1!" })
                        {
                          isError
                          message
                          body {
                            firstName
                            lastName
                            email
                          }
                        }
                      }`;

                // Act
                const mutationResponse = await testClient.mutate(mutation);

                // Assert
                const expectedResponse = {
                    data: {
                        register: { isError: true, message: 'Account already exists.', body: null },
                    },
                };
                expect(mutationResponse).toEqual(expectedResponse);
            });
            test('should register a new account and return registered user', async () => {
                // Arrange
                const mutation = `mutation{
                        register(input: { email: "newUser@test.com", firstName: "New", lastName: "User", password: "Password1!", confirmPassword: "Password1!" })\
                        {
                          isError
                          message
                          body {
                            firstName
                            lastName
                            email
                          }
                        }
                      }`;

                // Act
                const mutationResponse = await testClient.mutate(mutation);

                // Assert
                const expectedResponse = {
                    data: {
                        register: {
                            isError: false,
                            message: '',
                            body: { firstName: 'New', lastName: 'User', email: 'newUser@test.com' },
                        },
                    },
                };
                expect(mutationResponse).toEqual(expectedResponse);
            });
        });
        describe('login', () => {
            test('should login sucessfully and return user data', async () => {
                // Arrange
                const mutation = `mutation{
                        login(input: { email: "${userData.email}", password: "${userData.password}" })
                        {
                            isError
                            message
                            body {
                                id
                                firstName
                                lastName
                                email
                            }
                        }
                    }`;

                // Act
                const mutationResponse = await testClient.mutate(mutation);
                console.log(mutationResponse);

                // Assert
                const expectedResponse = {
                    data: {
                        login: {
                            isError: false,
                            message: '',
                            body: {
                                id: toUserId(userData).id,
                                firstName: userData.firstName,
                                lastName: userData.lastName,
                                email: userData.email,
                            },
                        },
                    },
                };
                expect(mutationResponse).toEqual(expectedResponse);
            });
        });
    });
});
