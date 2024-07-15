import { ValidationError, UniqueConstraintError, ForeignKeyConstraintError } from 'sequelize';

const handleSequelizeError = (error, res) => {
    if (error instanceof ValidationError) {
        const validationErrors = error.errors.map(e => e.message);
        return res.status(400).json({ error: validationErrors });
    }

    if (error instanceof UniqueConstraintError) {
        const uniqueConstraintErrors = error.errors.map(e => e.message);
        return res.status(400).json({ error: uniqueConstraintErrors });
    }

    if (error instanceof ForeignKeyConstraintError) {
        return res.status(400).json({ error: 'Foreign key constraint error' });
    }

    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal server error' });
};

export default handleSequelizeError;
