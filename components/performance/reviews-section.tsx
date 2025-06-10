'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Calendar, User, Eye } from 'lucide-react';

const reviews = [
  {
    id: 1,
    title: 'Q4 2023 Performance Review',
    reviewer: 'Sarah Johnson',
    date: '2023-12-15',
    rating: 4.5,
    status: 'completed',
    summary: 'Excellent performance with strong leadership skills demonstrated.',
  },
  {
    id: 2,
    title: 'Mid-Year Review 2023',
    reviewer: 'Michael Chen',
    date: '2023-06-30',
    rating: 4.2,
    status: 'completed',
    summary: 'Good progress on goals with room for improvement in time management.',
  },
  {
    id: 3,
    title: 'Q1 2024 Check-in',
    reviewer: 'Sarah Johnson',
    date: '2024-01-20',
    rating: null,
    status: 'scheduled',
    summary: 'Upcoming quarterly review to discuss recent achievements.',
  },
  {
    id: 4,
    title: 'Project Alpha Review',
    reviewer: 'David Wilson',
    date: '2023-11-10',
    rating: 4.8,
    status: 'completed',
    summary: 'Outstanding project delivery and team collaboration.',
  },
];

const statusColors = {
  completed: 'bg-green-100 text-green-800',
  scheduled: 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
};

export function ReviewsSection() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Performance Reviews
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium">{review.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{review.summary}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{review.reviewer}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{review.date}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {review.rating && (
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                      <span className="text-sm font-medium ml-1">{review.rating}</span>
                    </div>
                  )}
                </div>
                <Badge className={statusColors[review.status as keyof typeof statusColors]}>
                  {review.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
