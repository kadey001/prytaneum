'use server';

import { prisma } from '@local/core';
import type { UsersTableSearchFilter } from './UsersTable';
import type { ClassesTableSearchFilter } from './ClassesTable';
import { revalidatePath } from 'next/cache';

export async function promoteUser(userId: string) {
    try {
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                role: 'TEACHER',
            },
        });

        return { isError: false, message: 'User promoted successfully' };
    } catch (error) {
        console.error(error);
        return { isError: true, message: 'Error promoting user' };
    }
}

export async function demoteUser(userId: string) {
    try {
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                role: 'STUDENT',
            },
        });

        return { isError: false, message: 'User demoted successfully' };
    } catch (error) {
        console.error(error);
        return { isError: true, message: 'Error demoting user' };
    }
}

export async function getAllUsers(ammount: number) {
    try {
        const users = await prisma.user.findMany({
            take: ammount + 1,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                studentOf: {
                    select: {
                        class: {
                            select: {
                                termId: true,
                            },
                        },
                    },
                },
            },
        });

        const hasNextPage = users.length > ammount;

        // Add termId to student users for users table data
        const formattedUsers = users.map((user) => {
            if (user.role !== 'STUDENT') return { ...user, termId: null };
            const termId = user.studentOf[0]?.class.termId;
            return { ...user, termId };
        });

        return { users: hasNextPage ? formattedUsers.slice(0, -2) : formattedUsers, hasNextPage };
    } catch (error) {
        console.error(error);
        return { users: [], hasNextPage: false };
    }
}

export async function hasNextPageUsers(ammount: number, page: number, filter: UsersTableSearchFilter) {
    try {
        const users = await prisma.user.findMany({
            take: ammount,
            skip: page * ammount,
            where: {
                email: {
                    contains: filter.email,
                },
                firstName: {
                    contains: filter.firstName,
                },
                lastName: {
                    contains: filter.lastName,
                },
            },
        });

        return users.length > 0;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function loadNextPageUsers(ammount: number, page: number, filter: UsersTableSearchFilter) {
    try {
        const users = await prisma.user.findMany({
            take: ammount + 1,
            skip: page * ammount,
            where: {
                email: {
                    contains: filter.email,
                },
                firstName: {
                    contains: filter.firstName,
                },
                lastName: {
                    contains: filter.lastName,
                },
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                studentOf: {
                    select: {
                        class: {
                            select: {
                                termId: true,
                            },
                        },
                    },
                },
            },
        });

        const hasNextPage = users.length > ammount;

        // Add termId to student users for users table data
        const formattedUsers = users.map((user) => {
            if (user.role !== 'STUDENT') return { ...user, termId: null };
            const termId = user.studentOf[0]?.class.termId;
            return { ...user, termId };
        });

        return { users: hasNextPage ? formattedUsers.slice(0, -2) : formattedUsers, hasNextPage };
    } catch (error) {
        console.error(error);
        return { users: [], hasNextPage: false };
    }
}

export async function refreshUsers(ammount: number, filter: UsersTableSearchFilter) {
    try {
        const users = await prisma.user.findMany({
            take: ammount + 1,
            where: {
                email: {
                    contains: filter.email,
                },
                firstName: {
                    contains: filter.firstName,
                },
                lastName: {
                    contains: filter.lastName,
                },
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                studentOf: {
                    select: {
                        classId: true,
                        class: {
                            select: {
                                termId: true,
                            },
                        },
                    },
                },
            },
        });

        const hasNextPage = users.length > ammount;

        // Add termId to student users for users table data
        const formattedUsers = users.map((user) => {
            if (user.role !== 'STUDENT') return { ...user, termId: null };
            const termId = user.studentOf[0]?.class.termId;
            return { ...user, termId };
        });

        return { users: hasNextPage ? formattedUsers.slice(0, -2) : formattedUsers, hasNextPage };
    } catch (error) {
        console.error(error);
        return { users: [], hasNextPage: false };
    }
}

export async function getAllClasses(ammount: number) {
    try {
        const classes = await prisma.class.findMany({
            take: ammount + 1,
            select: {
                id: true,
                termId: true,
                name: true,
            },
        });
        const hasNextPage = classes.length > ammount;

        return { classes: hasNextPage ? classes.slice(0, -2) : classes, hasNextPage };
    } catch (error) {
        console.error(error);
        return { classes: [], hasNextPage: false };
    }
}

export async function hasNextPageClasses(ammount: number, page: number, filter: ClassesTableSearchFilter) {
    try {
        const classes = await prisma.class.findMany({
            take: ammount,
            skip: page * ammount,
            where: {
                termId: {
                    contains: filter.termId,
                },
                name: {
                    contains: filter.name,
                },
            },
        });

        return classes.length > 0;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function loadNextPageClasses(ammount: number, page: number, filter: ClassesTableSearchFilter) {
    try {
        const classes = await prisma.class.findMany({
            take: ammount + 1,
            skip: page * ammount,
            where: {
                termId: {
                    contains: filter.termId,
                },
                name: {
                    contains: filter.name,
                },
            },
            select: {
                id: true,
                termId: true,
                name: true,
            },
        });

        const hasNextPage = classes.length > ammount;

        return { classes: hasNextPage ? classes.slice(0, -2) : classes, hasNextPage };
    } catch (error) {
        console.error(error);
        return { classes: [], hasNextPage: false };
    }
}

export async function refreshClasses(ammount: number, filter: ClassesTableSearchFilter) {
    try {
        const classes = await prisma.class.findMany({
            take: ammount + 1,
            where: {
                termId: {
                    contains: filter.termId,
                },
                name: {
                    contains: filter.name,
                },
            },
            select: {
                id: true,
                termId: true,
                name: true,
            },
        });

        const hasNextPage = classes.length > ammount;

        return { classes: hasNextPage ? classes.slice(0, -2) : classes, hasNextPage };
    } catch (error) {
        console.error(error);
        return { classes: [], hasNextPage: false };
    }
}

export async function addTeacherByEmail(formData: FormData) {
    const email = formData.get('email') as string;
    const classId = formData.get('classId') as string;

    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
                // role: 'TEACHER',
            },
        });
        if (!user) throw new Error('User not found');
        const lowerCaseEmail = email.toLowerCase();
        // Create prytaneum account for user since there is a chance they aren't
        const response = await fetch(`${process.env.PRYTANEUM_URL}/api/create-account`, {
            method: 'POST',
            body: JSON.stringify({ email: lowerCaseEmail, firstName: user.firstName, lastName: user.lastName }),
        });

        if (response.ok) console.log(`Successfully created Prytaneum account: ${lowerCaseEmail}`);
        else {
            console.error(response);
            console.error(`Error creating Prytaneum account: ${lowerCaseEmail}`);
        }
        await prisma.teacher.upsert({
            where: {
                userId_classId: {
                    userId: user.id,
                    classId,
                },
            },
            update: {},
            create: {
                userId: user.id,
                classId,
            },
        });

        return { isError: false, message: '' };
    } catch (error) {
        console.error(error);
        if (error instanceof Error) return { isError: true, message: error.message };
        else return { isError: true, message: 'Something went wrong' };
    }
}

export async function deleteUser(userId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) throw new Error('User not found');

        // Admins cannot delete themselves
        if (user.role === 'ADMIN') throw new Error('Cannot delete admin account');

        await prisma.user.delete({
            where: {
                id: userId,
            },
        });

        console.log(`User ${userId} deleted`);
        return { isError: false, message: 'User deleted successfully' };
    } catch (error) {
        console.error(error);
        return { isError: true, message: 'Error deleting user' };
    }
}

export async function addStudentByEmail(formData: FormData) {
    const email = formData.get('email') as string;
    const classId = formData.get('classId') as string;

    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
                role: 'STUDENT',
            },
        });
        if (!user) throw new Error('Student not found');
        // Ensure user is not already a student in this or another class
        const student = await prisma.student.findFirst({
            where: {
                userId: user.id,
            },
        });
        if (student) throw new Error('User is already a student of another class');
        await prisma.student.upsert({
            where: {
                userId_classId: {
                    userId: user.id,
                    classId,
                },
            },
            update: {},
            create: {
                userId: user.id,
                classId,
            },
        });

        revalidatePath(`/class/${classId}`);

        return { isError: false, message: 'Student added to class successfully' };
    } catch (error) {
        console.error(error);
        if (error instanceof Error) return { isError: true, message: error.message };
        else return { isError: true, message: 'Something went wrong' };
    }
}
