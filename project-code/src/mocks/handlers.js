// msw tutorial: https://mswjs.io/docs/getting-started/mocks/rest-api

import { rest } from 'msw';

export const handlers = [

    rest.get('/main', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                topic_list: ['Introduction', 'Test-Driven Development', 'Functional Testing', 'Structural Testing',
                             'Unit Testing', 'Integration Testing', 'System Testing', 'Acceptance Testing'],
            })
        )
    }),

    rest.post('/topic', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                content_description: 'this is the teaching material for: ' + req.body,
                exercise_list: ['exercise 1', 'exercise 2', 'exercise 3'],
            })
        )
    }),

    rest.post('/exercise', (req, res, ctx) => {
        const jsonBody = JSON.parse(req.body);
        return res(
            ctx.status(200),
            ctx.json({
                exercise_description: 'these are the directions for exercise: ' + jsonBody.exercise + ' for topic: ' + jsonBody.topic,
            })
        )
    }),

    rest.post('/send-code', (req, res, ctx) => {
        const jsonBody = JSON.parse(req.body);
        return res(
            ctx.status(200),
            ctx.json({
                test_results: [1, 1, 0, 0, 1],
            })
        )
    })
];
