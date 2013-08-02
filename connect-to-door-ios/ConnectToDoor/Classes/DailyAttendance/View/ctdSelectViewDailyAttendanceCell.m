//
//  ctdSelectViewDailyAttendanceCell.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/24/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdSelectViewDailyAttendanceCell.h"

@implementation ctdSelectViewDailyAttendanceCell

@synthesize checkinField = _checkinField;
@synthesize checkinLabel = _checkinLabel;
@synthesize checkOutField = _checkOutField;
@synthesize checkOutLabel = _checkOutLabel;
@synthesize numberLabel = _numberLabel;
@synthesize nameLabel = _nameLabel;
@synthesize editByLabel = _editByLabel;

@synthesize separatorImage1 = _separatorImage1;
@synthesize separatorImage2 = _separatorImage2;
@synthesize separatorImage3 = _separatorImage3;
@synthesize separatorImage4 = _separatorImage4;

@synthesize editButton = _editButton;

- (id)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if (self) {
        // Initialization code
    }
    return self;
}

- (void)addColumn:(CGFloat)position {
    [columns addObject:[NSNumber numberWithFloat:position]];
}

- (void)drawRect:(CGRect)rect {
    CGContextRef ctx = UIGraphicsGetCurrentContext();
    // Use the same color and width as the default cell separator for now
    CGContextSetStrokeColorWithColor(ctx, [[UIColor greenColor] CGColor]);
    CGContextSetLineWidth(ctx, 0.25);
    
    for (int i = 0; i < [columns count]; i++) {
        CGFloat f = [((NSNumber*) [columns objectAtIndex:i]) floatValue];
        CGContextMoveToPoint(ctx, f, 0);
        CGContextAddLineToPoint(ctx, f, self.bounds.size.height);
    }
    
    CGContextStrokePath(ctx);
    
    [super drawRect:rect];
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated
{
    [super setSelected:selected animated:animated];
    
    // Configure the view for the selected state
}

@end