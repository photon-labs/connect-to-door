//
//  ctdAttendanceTableViewCell.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/24/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ctdAttendanceTableViewCell : UITableViewCell{
    NSMutableArray *columns;
}

- (void)addColumn:(CGFloat)position;

@end
