//
//  GridTableViewCell.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 5/6/13.
//  Copyright (c) 2013 Photon Infotech. All rights reserved.
//

#import "GridTableViewCell.h"
#import "ctdConstants.h"


@implementation GridTableViewCell

@synthesize lineColor, topCell, leftCell, rightCell, downCell, jobCodeCell, requisitionTitleCell, candidateCell, lastUpdatesCell, locationCell, statusCell, requisitionOwnerCell, nextStepCell;

- (id)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if (self) {
        topCell = NO;
        
		// Add labels for the eight cells
		jobCodeCell = [[UILabel alloc] initWithFrame:CGRectMake(CELL_CGFLOAT_X, CELL_CGFLOAT_Y, CELL1WIDTH_HOME, CELLHEIGHT_HOME)];
		jobCodeCell.textAlignment = NSTextAlignmentCenter;
        jobCodeCell.font = [UIFont fontWithName:@"Helvetica" size:14];
		jobCodeCell.backgroundColor = [UIColor clearColor]; 
		[self addSubview:jobCodeCell];
		
		requisitionTitleCell = [[UILabel alloc] initWithFrame:CGRectMake(CELL1WIDTH_HOME, CELL_CGFLOAT_Y, CELL2WIDTH, CELLHEIGHT_HOME)];
		requisitionTitleCell.textAlignment = NSTextAlignmentCenter;
        requisitionTitleCell.font = [UIFont fontWithName:@"Helvetica" size:14];
		requisitionTitleCell.backgroundColor = [UIColor clearColor]; 
		[self addSubview:requisitionTitleCell];
        
		candidateCell = [[UILabel alloc] initWithFrame:CGRectMake(CELL1WIDTH_HOME+CELL2WIDTH, CELL_CGFLOAT_Y, CELL3WIDTH, CELLHEIGHT_HOME)];
		candidateCell.textAlignment = NSTextAlignmentCenter;
        candidateCell.font = [UIFont fontWithName:@"Helvetica" size:14];
		candidateCell.backgroundColor = [UIColor clearColor]; 
		[self addSubview:candidateCell];
        
        lastUpdatesCell = [[UILabel alloc] initWithFrame:CGRectMake(CELL1WIDTH_HOME+CELL2WIDTH+CELL3WIDTH, CELL_CGFLOAT_Y, CELL4WIDTH, CELLHEIGHT_HOME)];
		lastUpdatesCell.textAlignment = NSTextAlignmentCenter;
        lastUpdatesCell.font = [UIFont fontWithName:@"Helvetica" size:14];
		lastUpdatesCell.backgroundColor = [UIColor clearColor]; 
		[self addSubview:lastUpdatesCell];
        
        
        locationCell = [[UILabel alloc] initWithFrame:CGRectMake(CELL1WIDTH_HOME+CELL2WIDTH+CELL3WIDTH+CELL4WIDTH, CELL_CGFLOAT_Y, CELL5WIDTH, CELLHEIGHT_HOME)];
		locationCell.textAlignment = NSTextAlignmentCenter;
        locationCell.font = [UIFont fontWithName:@"Helvetica" size:14];
		locationCell.backgroundColor = [UIColor clearColor];
		[self addSubview:locationCell];
		
		statusCell = [[UILabel alloc] initWithFrame:CGRectMake(CELL1WIDTH_HOME+CELL2WIDTH+CELL3WIDTH+CELL4WIDTH+CELL5WIDTH, CELL_CGFLOAT_Y, CELL6WIDTH, CELLHEIGHT_HOME)];
		statusCell.textAlignment = NSTextAlignmentCenter;
        statusCell.font = [UIFont fontWithName:@"Helvetica" size:14];
		statusCell.backgroundColor = [UIColor clearColor];
		[self addSubview:statusCell];
        
		requisitionOwnerCell = [[UILabel alloc] initWithFrame:CGRectMake(CELL1WIDTH_HOME+CELL2WIDTH+CELL3WIDTH+CELL4WIDTH+CELL5WIDTH+CELL6WIDTH, CELL_CGFLOAT_Y, CELL7WIDTH, CELLHEIGHT_HOME)];
		requisitionOwnerCell.textAlignment = NSTextAlignmentCenter;
        requisitionOwnerCell.font = [UIFont fontWithName:@"Helvetica" size:14];
		requisitionOwnerCell.backgroundColor = [UIColor clearColor];
		[self addSubview:requisitionOwnerCell];
        
        nextStepCell = [[UILabel alloc] initWithFrame:CGRectMake(CELL1WIDTH_HOME+CELL2WIDTH+CELL3WIDTH+CELL4WIDTH+CELL5WIDTH+CELL6WIDTH+CELL7WIDTH, CELL_CGFLOAT_Y, CELL8WIDTH, CELLHEIGHT_HOME)];
		nextStepCell.textAlignment = NSTextAlignmentCenter;
        nextStepCell.font = [UIFont fontWithName:@"Helvetica" size:14];
		nextStepCell.backgroundColor = [UIColor clearColor];
        [self addSubview:nextStepCell];

    }
    return self;
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated
{
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

- (void)drawRect:(CGRect)rect
{
	CGContextRef context = UIGraphicsGetCurrentContext();
	CGContextSetStrokeColorWithColor(context, lineColor.CGColor);
    
	// CGContextSetLineWidth: The default line width is 1 unit. When stroked, the line straddles the path, with half of the total width on either side.
	// Therefore, a 1 pixel vertical line will not draw crisply unless it is offest by 0.5. This problem does not seem to affect horizontal lines.
	CGContextSetLineWidth(context, CONTEXT_WIDTH);
    
	// Add the vertical lines
	CGContextMoveToPoint(context, CELL1WIDTH_HOME+CONTEXT_WIDTH_ADDITION, CONTEXT_CGFLOAT_Y);
	CGContextAddLineToPoint(context, CELL1WIDTH_HOME+CONTEXT_WIDTH_ADDITION, rect.size.height);
    
	CGContextMoveToPoint(context, CELL1WIDTH_HOME+CELL2WIDTH+CONTEXT_WIDTH_ADDITION, CONTEXT_CGFLOAT_Y);
	CGContextAddLineToPoint(context, CELL1WIDTH_HOME+CELL2WIDTH+CONTEXT_WIDTH_ADDITION, rect.size.height);
    
    CGContextMoveToPoint(context, CELL1WIDTH_HOME+CELL2WIDTH+CELL3WIDTH+CONTEXT_WIDTH_ADDITION, CONTEXT_CGFLOAT_Y);
	CGContextAddLineToPoint(context, CELL1WIDTH_HOME+CELL2WIDTH+CELL3WIDTH+CONTEXT_WIDTH_ADDITION, rect.size.height);
    
    CGContextMoveToPoint(context, CELL1WIDTH_HOME+CELL2WIDTH+CELL3WIDTH+CELL4WIDTH+CONTEXT_WIDTH_ADDITION, CONTEXT_CGFLOAT_Y);
	CGContextAddLineToPoint(context, CELL1WIDTH_HOME+CELL2WIDTH+CELL3WIDTH+CELL4WIDTH+CONTEXT_WIDTH_ADDITION, rect.size.height);
    
    CGContextMoveToPoint(context, CELL1WIDTH_HOME+CELL2WIDTH+CELL3WIDTH+CELL4WIDTH+CELL5WIDTH+CONTEXT_WIDTH_ADDITION, CONTEXT_CGFLOAT_Y);
	CGContextAddLineToPoint(context, CELL1WIDTH_HOME+CELL2WIDTH+CELL3WIDTH+CELL4WIDTH+CELL5WIDTH+CONTEXT_WIDTH_ADDITION, rect.size.height);
    
    CGContextMoveToPoint(context, CELL1WIDTH_HOME+CELL2WIDTH+CELL3WIDTH+CELL4WIDTH+CELL5WIDTH+CELL6WIDTH+CONTEXT_WIDTH_ADDITION, CONTEXT_CGFLOAT_Y);
	CGContextAddLineToPoint(context, CELL1WIDTH_HOME+CELL2WIDTH+CELL3WIDTH+CELL4WIDTH+CELL5WIDTH+CELL6WIDTH+CONTEXT_WIDTH_ADDITION, rect.size.height);
    
    CGContextMoveToPoint(context, CELL1WIDTH_HOME+CELL2WIDTH+CELL3WIDTH+CELL4WIDTH+CELL5WIDTH+CELL6WIDTH+CELL7WIDTH+CONTEXT_WIDTH_ADDITION, CONTEXT_CGFLOAT_Y);
	CGContextAddLineToPoint(context, CELL1WIDTH_HOME+CELL2WIDTH+CELL3WIDTH+CELL4WIDTH+CELL5WIDTH+CELL6WIDTH+CELL7WIDTH+CONTEXT_WIDTH_ADDITION, rect.size.height);
    
    CGContextMoveToPoint(context, CELL1WIDTH_HOME+CELL2WIDTH+CELL3WIDTH+CELL4WIDTH+CELL5WIDTH+CELL6WIDTH+CELL7WIDTH+CELL8WIDTH+CONTEXT_WIDTH_ADDITION, CONTEXT_CGFLOAT_Y);
	CGContextAddLineToPoint(context, CELL1WIDTH_HOME+CELL2WIDTH+CELL3WIDTH+CELL4WIDTH+CELL5WIDTH+CELL6WIDTH+CELL7WIDTH+CELL8WIDTH+CONTEXT_WIDTH_ADDITION, rect.size.height);
    
	// Add bottom line
	CGContextMoveToPoint(context, BOTTOM_CONTEXT_WIDTH, rect.size.height);
	CGContextAddLineToPoint(context, rect.size.width, rect.size.height-CONTEXT_HEIGHT_ADDITION);
	
	// If this is the topmost cell in the table, draw the line on top
	if (topCell)
	{
		CGContextMoveToPoint(context, BOTTOM_CONTEXT_WIDTH, CONTEXT_CGFLOAT_Y);
		CGContextAddLineToPoint(context, rect.size.width, CONTEXT_CGFLOAT_Y);
	}
	
	// Draw the lines
	CGContextStrokePath(context);
}

- (void)setTopCell:(BOOL)newTopCell
{
	topCell = newTopCell;
    [self setNeedsDisplay];
}

@end
