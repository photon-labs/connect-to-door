//
//  GridTableViewCell.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 5/6/13.
//  Copyright (c) 2013 Photon Infotech. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface GridTableViewCell : UITableViewCell{
    
    UIColor *lineColor;
	BOOL topCell;
    BOOL leftCell;
    BOOL rightCell;
    BOOL downCell;
	
	UILabel *jobCodeCell;
	UILabel *requisitionTitleCell;
	UILabel *candidateCell;
    UILabel *lastUpdatesCell;
    UILabel *locationCell;
	UILabel *statusCell;
	UILabel *requisitionOwnerCell;
    UILabel *nextStepCell;
    
}

@property (nonatomic, retain) UIColor* lineColor;
@property (nonatomic) BOOL topCell;
@property (nonatomic) BOOL leftCell;
@property (nonatomic) BOOL rightCell;
@property (nonatomic) BOOL downCell;
@property (readonly) UILabel* jobCodeCell;
@property (readonly) UILabel* requisitionTitleCell;
@property (readonly) UILabel* candidateCell;
@property (readonly) UILabel* lastUpdatesCell;
@property (readonly) UILabel* locationCell;
@property (readonly) UILabel* statusCell;
@property (readonly) UILabel* requisitionOwnerCell;
@property (readonly) UILabel* nextStepCell;

@end
