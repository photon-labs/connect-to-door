//
//  ctdSelectViewReimbursementCell.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/26/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ctdSelectViewReimbursementCell : UITableViewCell{
    NSMutableArray *columns;
}

- (void)addColumn:(CGFloat)position;

@end
