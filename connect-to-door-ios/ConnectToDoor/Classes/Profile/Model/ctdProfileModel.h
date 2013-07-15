//
//  ctdReponseLoginModel.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ctdProfileModel : NSObject

@property (nonatomic, strong) NSString *facebookId;
@property (nonatomic, strong) NSString *employeeId;
@property (nonatomic, strong) NSString *employeeName;
@property (nonatomic, strong) NSString *userName;
@property (nonatomic, strong) NSString *gender;
@property (nonatomic, strong) NSString *employeeEmailPhoton;
@property (nonatomic, strong) NSString *employeeStartWork;
@property (nonatomic, strong) NSString *signature;
@property (nonatomic, strong) NSString *status;
@property (nonatomic, strong) NSString *authority;
@property (nonatomic, strong) NSString *projectId;
@property (nonatomic, strong) NSString *married;
@property (nonatomic, strong) NSString *condolences;
@property (nonatomic, strong) NSString *maternity;
@property (nonatomic, strong) NSString *cOff;
@property (nonatomic, strong) NSString *annual;
@property (nonatomic, strong) NSString *onsite;
@property (nonatomic, strong) NSString *paternity;
@property (nonatomic, strong) NSString *sick;

- (ctdProfileModel *)initWithDefault;

@end
