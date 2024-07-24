
import Category from '../models/category.model.js';
class CategoryController {

    static async createCategory(req, res) {
        const { name, type, parentCategoryId } = req.body;
        const userId = req.user.id;

        try {
            const category = await Category.create({ name, type, parentCategoryId, userId });
            return res.status(201).json(category);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getCategories(req, res) {
        const userId = req.user.id;

        try {
            const categories = await Category.findAll({
                where: { userId },
                include: [
                    { model: Category, as: 'subcategories' }
                ]
            });
            return res.status(200).json(categories);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

}

export default CategoryController