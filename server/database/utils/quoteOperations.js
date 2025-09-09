const { Quote } = require('../models');

class QuoteOperations {
  // Create a new quote
  static async createQuote(quoteData) {
    try {
      const quote = new Quote(quoteData);
      
      // Calculate simulation results before saving
      quote.calculateSimulation();
      
      const savedQuote = await quote.save();
      return {
        success: true,
        data: savedQuote,
        message: 'Quote created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to create quote'
      };
    }
  }

  // Find quotes with filters
  static async findQuotes(filters = {}, options = {}) {
    try {
      const {
        status,
        gridType,
        installationType,
        dateFrom,
        dateTo,
        phoneNumber,
        limit = 50,
        page = 1,
        sortBy = 'createdAt',
        sortOrder = -1
      } = { ...filters, ...options };

      const query = {};

      // Apply filters
      if (status) query.status = status;
      if (gridType) query['systemConfig.gridType'] = gridType;
      if (installationType) query['systemConfig.installationType'] = installationType;
      if (phoneNumber) query['personalInfo.phoneNumber'] = phoneNumber;
      
      if (dateFrom || dateTo) {
        query.createdAt = {};
        if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
        if (dateTo) query.createdAt.$lte = new Date(dateTo);
      }

      const skip = (page - 1) * limit;
      const sort = { [sortBy]: sortOrder };

      const [quotes, total] = await Promise.all([
        Quote.find(query)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .lean(),
        Quote.countDocuments(query)
      ]);

      return {
        success: true,
        data: {
          quotes,
          pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
          }
        },
        message: 'Quotes retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve quotes'
      };
    }
  }

  // Get quote by ID
  static async getQuoteById(quoteId) {
    try {
      const quote = await Quote.findById(quoteId);
      
      if (!quote) {
        return {
          success: false,
          message: 'Quote not found'
        };
      }

      return {
        success: true,
        data: quote,
        message: 'Quote retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve quote'
      };
    }
  }

  // Update quote status
  static async updateQuoteStatus(quoteId, newStatus) {
    try {
      const quote = await Quote.findByIdAndUpdate(
        quoteId,
        { 
          status: newStatus,
          updatedAt: new Date()
        },
        { new: true, runValidators: true }
      );

      if (!quote) {
        return {
          success: false,
          message: 'Quote not found'
        };
      }

      return {
        success: true,
        data: quote,
        message: 'Quote status updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to update quote status'
      };
    }
  }

  // Update quote data
  static async updateQuote(quoteId, updateData) {
    try {
      const quote = await Quote.findByIdAndUpdate(
        quoteId,
        updateData,
        { new: true, runValidators: true }
      );

      if (!quote) {
        return {
          success: false,
          message: 'Quote not found'
        };
      }

      // Recalculate simulation if system config changed
      if (updateData.systemConfig) {
        quote.calculateSimulation();
        await quote.save();
      }

      return {
        success: true,
        data: quote,
        message: 'Quote updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to update quote'
      };
    }
  }

  // Delete quote
  static async deleteQuote(quoteId) {
    try {
      const quote = await Quote.findByIdAndDelete(quoteId);

      if (!quote) {
        return {
          success: false,
          message: 'Quote not found'
        };
      }

      return {
        success: true,
        data: quote,
        message: 'Quote deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to delete quote'
      };
    }
  }

  // Get quotes statistics
  static async getQuotesStatistics() {
    try {
      const [
        totalQuotes,
        statusCounts,
        systemTypeCounts,
        monthlyTrends
      ] = await Promise.all([
        Quote.countDocuments(),
        Quote.aggregate([
          { $group: { _id: '$status', count: { $sum: 1 } } }
        ]),
        Quote.aggregate([
          {
            $group: {
              _id: {
                gridType: '$systemConfig.gridType',
                installationType: '$systemConfig.installationType'
              },
              count: { $sum: 1 }
            }
          }
        ]),
        Quote.aggregate([
          {
            $group: {
              _id: {
                year: { $year: '$createdAt' },
                month: { $month: '$createdAt' }
              },
              count: { $sum: 1 },
              totalValue: { $sum: '$simulationResults.estimatedCost.amount' }
            }
          },
          { $sort: { '_id.year': -1, '_id.month': -1 } },
          { $limit: 12 }
        ])
      ]);

      return {
        success: true,
        data: {
          totalQuotes,
          statusCounts,
          systemTypeCounts,
          monthlyTrends
        },
        message: 'Statistics retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve statistics'
      };
    }
  }
}

module.exports = QuoteOperations;