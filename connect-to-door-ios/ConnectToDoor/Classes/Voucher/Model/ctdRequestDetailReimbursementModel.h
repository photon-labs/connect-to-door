//
//  ctdRequestDetailReimbursementModel.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/29/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ctdRequestDetailReimbursementModel : NSObject

@property (nonatomic, strong) NSString *description;
@property (nonatomic, strong) NSString *quantity;
@property (nonatomic, strong) NSString *cost;
@property (nonatomic, strong) NSString *date;
@property (nonatomic, strong) NSString *employeeName;

- (ctdRequestDetailReimbursementModel *)initWithDefault;

@end
