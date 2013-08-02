//
//  ctdSelectViewDailyAttendanceCell.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/24/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ctdCustomTextField.h"

@interface ctdSelectViewDailyAttendanceCell : UITableViewCell{
    NSMutableArray *columns;
}


@property (nonatomic, strong) UILabel *numberLabel;
@property (nonatomic, strong) UILabel *nameLabel;
@property (nonatomic, strong) UILabel *editByLabel;

@property (nonatomic, strong) UILabel *checkinLabel;
@property (nonatomic, strong) ctdCustomTextField *checkinField;
@property (nonatomic, strong) UILabel *checkOutLabel;
@property (nonatomic, strong) ctdCustomTextField *checkOutField;

@property (nonatomic, strong) UIImageView *separatorImage1;
@property (nonatomic, strong) UIImageView *separatorImage2;
@property (nonatomic, strong) UIImageView *separatorImage3;
@property (nonatomic, strong) UIImageView *separatorImage4;
@property (nonatomic, strong) UIButton *editButton;

- (void)addColumn:(CGFloat)position;

@end
