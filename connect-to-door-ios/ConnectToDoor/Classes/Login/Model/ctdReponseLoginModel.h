//
//  ctdReponseLoginModel.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ctdReponseLoginModel : NSObject


@property (nonatomic, strong) NSString *username;
@property (nonatomic, strong) NSString *previlage;
@property (nonatomic, strong) NSString *message;
@property (nonatomic, strong) NSString *status;

- (ctdReponseLoginModel *)initWithDefault;

@end
